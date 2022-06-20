import ReactGA, {EventArgs} from 'react-ga';
import { ga } from '@config/analytics.json';

export function configureAnalytics() {
    let global = (window as any);
    if (global && ga.enabled && !global.GA_INITIALIZED) {
        ReactGA.initialize(ga.trackingId);
        global.GA_INITIALIZED = true;
    }
}