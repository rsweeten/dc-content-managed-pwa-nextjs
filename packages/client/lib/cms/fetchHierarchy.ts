import fetch from 'isomorphic-unfetch';
import { CmsContext } from './CmsContext';
import { CmsContent } from './CmsContent';

import { hierarchiesApi } from '@config/cms.json';

export type CmsHierarchyRequest = { tree: { key: string } };

export type CmsHierarchyNode = {
    content: CmsContent,
    children: CmsHierarchyNode[]
};

async function fetchHierarchy(items: CmsHierarchyRequest[], context: CmsContext): Promise<(CmsHierarchyNode | null)[]> {
    const host = context.stagingApi || context.contentApi;
    
    const fetchedContent: CmsHierarchyNode[] = await Promise.all(
        items.map(item => {
            const headers: any = {};
            if (context.stagingApi) {
                headers['x-environment'] = context.stagingApi;
            }
            return fetch(`${hierarchiesApi}/content-hierarchy/key/${item.tree.key}`, {
                headers
            })
            .then(x => x.json());
        })
    );
    
    return fetchedContent;
}

export default fetchHierarchy;