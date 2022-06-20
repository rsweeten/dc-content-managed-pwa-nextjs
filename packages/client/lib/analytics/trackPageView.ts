import ReactGA from 'react-ga';
import { ga } from '@config/analytics.json';

export default function trackPageView() {
    if (ga.enabled) {
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }
}