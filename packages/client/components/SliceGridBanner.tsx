import React from 'react';
import { WithStyles, Theme } from "@material-ui/core";
import { MediaImageLink } from "dc-extensions-sdk/dist/types/lib/components/MediaLink";
import { alpha, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = (theme: Theme) => ({
    root: {
    }
});

export type DITransformedImage = {
    image?: MediaImageLink;
    crop: number[];
    poi: DiTransformPoi;
    rot: number;
    hue: number;
    sat: number;
    bri: number;
    fliph: boolean;
    flipv: boolean;

    aspectLock: string;
    query: string;
}

export interface DiTransformPoi {
    x: number;
    y: number;
}

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;

    images: DITransformedImage[];

    heroImage: string;
    eyebrowText: string;
    staticBold: string;
    cycleText: string[];
    cycleCadence: number;
    subText: string;
    
}

const SliceGridBanner: React.FC<Props> = props => {
    const {
        classes,
        className,
        images,
        heroImage,
        eyebrowText,
        staticBold,
        cycleText,
        cycleCadence,
        subText,
        ...other
    } = props;

    return (
        <div className={clsx(classes.root, className)} {...other}>
            testing
            
        </div>
    );
}

export default withStyles(styles)(SliceGridBanner);