import React, { useEffect, useState } from 'react';
import { WithStyles, Theme } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { CmsImage, ImageTransformations } from '../../../utils/getImageURL';
import clsx from 'clsx';
import CycleTextBanner from '../CycleText';
import { Video } from '../../cms';

const styles = (theme: Theme) => ({
    root: {
        position: 'relative' as 'relative',
        height: '600px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '1440px',
        margin: '20px auto',
        boxSizing: 'border-box' as 'border-box',
        resize: 'horizontal' as 'horizontal',
        [theme.breakpoints.down('sm')]: {
            overflow: 'visible',
            height: 'auto !important'
        },
    },
    sliceParent: {
        width: '100%',
        height: '100%',
        '& .cycle-text-box': {
            width: '30%',
            [theme.breakpoints.down('sm')]: {
                height: '100%',
                width: '100%',
                padding: '8px'
            },
        },
        [theme.breakpoints.down('sm')]: {
            '& .cycle-parent': {
            },
            '& .cycle-image': {
                position: 'static' as 'static',
                maxHeight: '200px',
                overflow: 'hidden'
            }
        },
    },
    video: {
        position: 'absolute' as 'absolute',
        top: 0,
        width: '70%',
        '& video': {
            width: '100%'
        },
        '&.place-left': {
            right: 0
        },
        '&.place-right': {
            left: 0
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            position: 'static' as 'static'
        },
    }
});

let aC = 0;

export type link = {
    label: string;
    type: string;
    value: string;
}

export type image = {
    img: {
        image: ImageTransformations & {
            image: CmsImage;
        };
    };
    disablePoiAspectRatio: boolean;
    imageAltText: string;
    seoText: string;
}

export type Card = {
    image: image;
    id: number;
    show: boolean;
    shift: boolean;
    links: link[];
    cardName: string;
};

export type txt = {
    text: string;
    active: boolean;
}

export type CycleText = {
    heroImage: image;

    cycleText: txt[];
    desktopPlacement: string;
    desktopTextAlignment: string;
    mobileTextAlignment: string;
    verticalAlignment: string;

    eyebrowText: string;
    staticBold: string;
    subText: string;

    cycleCadence: number;
}

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    CycleText: CycleText;
    video: any;
}

const measureElement = (el : any) => {
    try {
        return {
            width: el.current.offsetWidth,
            height: el.current.offsetHeight
        };
        
    } catch (error) {
        //console.log(error);
        return {
            width: 450,
            height: 600
        }
    }
}

const CycleVidSplit: React.FC<Props> = props => {
    const videoEl = React.createRef<HTMLVideoElement>();

    const {
        classes,
        className,
        CycleText,
        video,
        ...other
    } = props;

    const [bannerHeight, setBannerHeight] = useState(100);

    let videoH = 0
    
    const draw = () => {
        videoH = measureElement(videoEl).height;
        setBannerHeight(videoH);
    }
    
    useEffect(() => {
        draw();

        window.addEventListener('resize', draw);

        return () => {
            window.removeEventListener('resize', draw);
        }
    });

    return (
        <div className={clsx(classes.root, className)} {...other} style={{height: bannerHeight+'px'}}>
            <div className={classes.sliceParent}>

                <CycleTextBanner {...CycleText} />

                <div className={`${classes.video} place-${CycleText.desktopPlacement}`}>
                <div className='amp-dc-video-wrap'>
                        <video ref={videoEl} autoPlay muted className="amp-dc-video" 
                            poster={`https://${video.video.defaultHost}/v/${video.video.endpoint}/${video.video.name}?protocol=https`}
                              
                            src={`https://${video.video.defaultHost}/v/${video.video.endpoint}/${video.video.name}/mp4_720p?protocol=https`}>
                            <source src={`https://${video.video.defaultHost}/v/${video.video.endpoint}/${video.video.name}/mp4_720p?protocol=https`}
                                data-res="High" data-bitrate="2119" data-label="High"
                                type="video/mpeg4" />

                            <source src={`https://${video.video.defaultHost}/v/${video.video.endpoint}/${video.video.name}/mp4_480p?protocol=https`}
                                data-res="Medium" data-bitrate="689" data-label="Medium"
                                type="video/mpeg4" />

                            <source src={`https://${video.video.defaultHost}/v/${video.video.endpoint}/${video.video.name}/webm_480p?protocol=https`}
                                data-res="Medium" data-bitrate="624" data-label="Medium"
                                type="video/webm" />
                        </video>
                        <div className="pause-button inactive"></div>
                    </div>
                </div>
                
                
            </div>
        </div>
    );
}

export default withStyles(styles)(CycleVidSplit);