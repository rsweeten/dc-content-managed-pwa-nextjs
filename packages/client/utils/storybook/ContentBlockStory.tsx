import React, { FC } from 'react';
import { CmsRequest } from '@lib/cms/fetchContent';
import { WithLazyContent } from '@components/cms-modern';
import { ContentBlock } from '@components/cms';
import Skeleton from 'react-loading-skeleton';

import config from '@config/cms.json';

interface Props {
    request: CmsRequest;
    overrideContent?: (content: any) => any;
}

const ContentBlockStory: FC<Props> = (props) => {
    const {
        request,
        overrideContent
    } = props;

    return (
        <WithLazyContent request={request} cmsContextOverrides={{locale: 'en-US', stagingApi: config.stagingApi}} enrichContent={true}>
            {({content}) => content ? <ContentBlock content={overrideContent ? overrideContent(content) : content} /> : <Skeleton />}
        </WithLazyContent>
    );
};

export default ContentBlockStory;