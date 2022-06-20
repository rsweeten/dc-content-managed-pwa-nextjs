import trackEvent, { TrackingEvent } from "./trackEvent";
import { useCmsContentItem } from "@components/cms/CmsContentItem/CmsContentItem";
import { useCmsEdition } from "@components/cms/CmsEdition/CmsEdition";
import { useCmsSlot } from "@components/cms/CmsSlot/CmsSlot";
import { ga } from '@config/analytics.json';

export function useContentAnalytics() {
    const {
        id: cmsContentId
    } = useCmsContentItem() || {};

    const {
        id: cmsEditionId
    } = useCmsEdition() || {};

    const {
        id: cmsSlotId
    } = useCmsSlot() || {};

    return {
        trackEvent: (event: TrackingEvent) => {
            ga.enabled && trackEvent({
                ...event,
                context: {
                    cmsContentId,
                    cmsEditionId,
                    cmsSlotId
                }
            });
        }
    };
}