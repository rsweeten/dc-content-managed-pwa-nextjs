import { FetchMapOutput } from "@utils/FetchMap";
import { CmsRequest } from "./fetchContent";
import { CmsContent } from "./CmsContent";
import { useEffect, useState } from "react";
import isServer from "@utils/isServer";
import fetchContentMap from "./fetchContentMap";
import { CmsContext } from "./CmsContext";

export default function withContentHotReloading(
    content: FetchMapOutput<any, CmsRequest, CmsContent>,
    cmsContext: CmsContext
) {
    return content;
    // //TODO: or disabled
    // if (!cmsContext || isServer()) {
    //     return content;
    // }

    // const [returnedContent, setReturnedContent] = useState(content);

    // let timeout: any = null;

    // const pollContent = async () => {
    //     const input: any = {};
    //     for (let key of Object.keys(content)) {
    //         if (Array.isArray(key)) {
    //             input[key] = content[key].map(item => { id: item?._meta?.deliveryId });
    //         } else {
    //             input[key] = { id: content[key]?._meta?.deliveryId }
    //         }
    //     }

    //     const updatedContent = await fetchContentMap(input, cmsContext);
    //     setReturnedContent(updatedContent as any);
    //     timeout = setTimeout(pollContent, 5000);
    // };

    // useEffect(() => {
    //     if (isServer()) {
    //         return;
    //     }

    //     timeout = setTimeout(pollContent, 5000);
    //     return () => {
    //         clearTimeout(timeout);
    //     }
    // })

    // return returnedContent;
}