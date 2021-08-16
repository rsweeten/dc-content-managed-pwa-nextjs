import React from 'react';
import { NextPage } from 'next';

import EditorialBlock from '../components/EditorialBlock';
import HeroBannerBlock from '../components/HeroBannerBlock';
import GalleryBlock from '../components/GalleryBlock';
import Navigation from '../components/Navigation';

import ExtendedBannerBlock from '../components/ExtendedBannerBlock';
import { fetchContentById } from '../utils/fetchContent';
import SliceGridBanner from '../components/SliceGridBanner';
import SliceCardBanner from '../components/SliceCardBanner';
import GenericCMSComponent from '../components/GenericCMSComponent';
import FourOne from '../components/FourOne';

interface Props {
    component: any
}

const Visualization: NextPage<Props> = (props: Props) => {
    let {
        component
    } = props;

    let ComponentType = null;

    console.log(component);
    switch (component.component) {
        case 'HeroBannerBlock':
            ComponentType = HeroBannerBlock;
            break;
        case 'EditorialBlock':
            ComponentType = EditorialBlock;
            break;
        case 'GalleryBlock':
            ComponentType = GalleryBlock;
            break;
        case 'Navigation':
            ComponentType = Navigation;
            break;
        case 'ExtendedBannerBlock':
            ComponentType = ExtendedBannerBlock;
            break;
        case 'SliceGridBanner':
            ComponentType = SliceGridBanner;
            break;
        case 'SliceCards':
            ComponentType = SliceCardBanner;
            break;
        case 'FourOne':
            ComponentType = FourOne;
            break;
        default:
            ComponentType = GenericCMSComponent;
    }

    return (
        <ComponentType {...component} />
    );
}

Visualization.getInitialProps = async (context) => {
    const content = fetchContentById(
        context.query.id as string, 
        context
    );

    return {
        component: await content
    };
};

export default Visualization;