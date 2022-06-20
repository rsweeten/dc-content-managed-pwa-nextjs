import ReactGA, {EventArgs} from 'react-ga';

export type TrackingEvent = {
    category: string;
    action: string;
    label?: string;
    value?: number;
    nonInteraction?: boolean;

    context?: {
        cmsSlotId?: string;
        cmsEditionId?: string;
        cmsContentId?: string;
    }
};

export default function trackEvent(event: TrackingEvent) {
    const args: EventArgs = {
        ...event,
    };

    const {
        cmsContentId,
        cmsSlotId,
        cmsEditionId
    } = event.context || {};

    if (cmsContentId) {
        args.dimension1 = cmsContentId;
    }

    if (cmsEditionId) {
        args.dimension2 = cmsEditionId;
    }

    if (cmsSlotId) {
        args.dimension3 = cmsSlotId;
    }

    ReactGA.event(args);
}