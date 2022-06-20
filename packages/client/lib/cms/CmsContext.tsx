import React, { FC } from 'react';
import { contentApi, stagingApi, defaultPreviewMode } from '@config/cms.json';
import { IncomingMessage } from 'http';
import { parse } from 'url';

const Cookies = require('cookies');

export type CmsContext = {
    contentApi: string;
    stagingApi?: string;
    locale?: string;
    currency?: string;
    timestamp?: number;
}

const Context = React.createContext<CmsContext | null>(null);

export function useCmsContext(): CmsContext {
    return React.useContext(Context) as CmsContext;
}

export const WithCmsContext: FC<{ value: CmsContext }> = ({children, value}) => {
    return <Context.Provider value={value}>
        { children }
    </Context.Provider>;
};

export function createCmsContext(req: IncomingMessage): CmsContext {
    const {
        url = ''
    } = req || {};

    const {
        query
    } = parse(url, true);

    const {
        vse: queryStringVse,
        locale: queryStringLocale
    } = query || {};

    const cookies = new Cookies(req);
    const cookieVse = cookies.get('amplience-host');
    const cookieTimestamp = cookies.get('timestamp');
    const cookieLocale = cookies.get('locale');
    const cookieCurrency = cookies.get('currency');

    return {
        contentApi,
        stagingApi: queryStringVse as string || cookieVse || null,
        locale: queryStringLocale as string || cookieLocale || 'en-US',
        currency: cookieCurrency || 'USD',
        timestamp: cookieTimestamp || null
    };
}