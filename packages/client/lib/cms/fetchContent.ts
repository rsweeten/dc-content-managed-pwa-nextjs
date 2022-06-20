import fetch from 'isomorphic-unfetch';
import { CmsContext } from './CmsContext';
import { CmsContent } from './CmsContent';

import DataLoader from 'dataloader';

export type GetByIdRequest = { id: string };
export type GetByKeyRequest = { key: string };
export type GetByFilterRequest = {
    filterBy: { path: string, value: any }[],
    sortBy?: {
        key: string;
        order?: 'asc' | 'desc'
    },
    page?: {
        size: number,
        cursor?: string
    },
    options?: {
        previewItems: boolean
    }
};

export type CmsRequest = GetByIdRequest | GetByKeyRequest | GetByFilterRequest;
export type CmsResponse = { content: CmsContent };

export type CmsFilterResponse = {
    responses: CmsResponse[],
    page: {
        responseCount: number,
        cursor?: string
    }
}

function isGetByIdRequest(request: any): request is GetByIdRequest {
    return request && request['id'] !== undefined;
}

function isGetByKeyRequest(request: any): request is GetByIdRequest {
    return request && request['key'] !== undefined;
}

function isGetByFilterRequest(request: any): request is GetByFilterRequest {
    return request && request.filterBy && Array.isArray(request.filterBy);
}

async function fetchContent(items: CmsRequest[], context: CmsContext): Promise<(CmsContent | CmsFilterResponse | null)[]> {
    const host = context.stagingApi || context.contentApi;

    const resolveContent = (requests: CmsRequest[]): Promise<CmsContent[]> => {
        return fetch(
            `https://${host}/content/fetch`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "parameters": {
                            "depth": "all",
                            "format": "inlined",
                            "locale": context.locale
                        },
                        "requests": requests
                    })
                }
            ).then(x => x.json())
                .then(x => x.responses)
                .then(x => x.map((y: any) => y.content || null));
    };

    const bulkContentLoader = new DataLoader<CmsRequest, CmsContent>(resolveContent as any, {
        maxBatchSize: 10
    });

    const resolveFilter = (request: GetByFilterRequest): Promise<CmsFilterResponse> => {
        const {
            options,
            ...withoutOptions
        } = request;

        return fetch(
            `https://${context.contentApi}/content/filter`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...withoutOptions,
                        "parameters": {
                            "depth": "all",
                            "format": "inlined",
                            "locale": context.locale
                        }
                    })
                }
            ).then(x => x.json())
            .then(async x => {
                if (options?.previewItems && context.stagingApi) {
                    //reload the children from VSE so we can preview changes to the items
                    return {
                        ...x,
                        responses: await Promise.all(x.responses.map(async (response: any) => {
                            if (response.content._meta.deliveryId) {
                                const previewItem = await bulkContentLoader.load({ id: response.content._meta.deliveryId });
                                return { content: previewItem };
                            }
                            return response;
                        }))
                    }
                }
                return x;
            });
    }
    
    const fetchedContent: CmsContent[] = await Promise.all(
        items.map((item: any) => {
            if (isGetByFilterRequest(item)) {
                return resolveFilter(item);
            } else {
                return bulkContentLoader.load(item);
            }
        })
    );
    
    return fetchedContent;
}

export default fetchContent;