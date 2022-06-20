import React, { useEffect, useRef, useState } from 'react';
import { Theme, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { CmsImage, ImageScaleFit, ImageScaleMode, ImageTransformations } from '../../../utils/getImageURL';
import clsx from 'clsx';
import { DefaultAdaptiveImageSkeleton, TrueAdaptiveImage } from '../AdaptiveImage';
import { CmsContent } from '../../../lib/cms/CmsContent';

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
        },
    },
    cycleParent: {
        position: 'relative' as 'relative',
        width: '100%',
        height: 'auto'
    },
    imgPane: {
        height: '600px',
        position: 'relative' as 'relative',
        width: '100%',
        '& img': {
            height: '100%',
            width: '100%'
        }
    },
    mainImage: {
        height: '100%',
        width: 'auto'
    },
    textBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        color:  'black',
        padding: '40px',
        position: 'absolute' as 'absolute',
        width: '100%',
        top: 0,
        display: 'table' as 'table',
        height: '100%',
        '& h3': {
            margin: '0 0 10px'
        },
        '&.place-left': {
            left: 0
        },
        '&.place-right': {
            right: 0
        },
        '&.align-left': {
            textAlign: 'left'
        },
        '&.align-center': {
            textAlign: 'center'
        },
        '&.align-right': {
            textAlign: 'right'
        },
        [theme.breakpoints.down('sm')]: {
            '&.malign-center': {
                textAlign: 'center'
            },
            '&.malign-right': {
                textAlign: 'right'
            },
            '&.malign-left': {
                textAlign: 'left'
            }
        }
    },
    textCell: {
        display: 'table-cell' as 'table-cell',
        "&.valign-top": {
            verticalAlign: 'top'
        },
        "&.valign-middle": {
            verticalAlign: 'middle'
        },
        "&.valign-bottom": {
            verticalAlign: 'bottom'
        }
    },
    cycleUL: {
        listStyle: 'none',
        margin: '0 0 74px -38px',
        position: 'relative' as 'relative',
        '&.align-center': {
            display: 'flex',
            justifyContent: 'center'
        },
        [theme.breakpoints.down('sm')]: {
            '&.malign-center': {
                display: 'flex',
                justifyContent: 'center'
            }
        }
    },
    cycleLI: {
        borderBottom: '2px solid #000000',
        display: 'inline-block',
        //fontStyle: 'italic',
        fontWeight: 800,
        color: '#000',
        position: 'absolute' as 'absolute',
        opacity: 0,
        transition: `opacity 150ms ${theme.transitions.easing.easeInOut}`,
        '&.active': {
            opacity: 1
        },
        '&.align-center': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        },
        '&.align-right': {
            right: 0
        },
        [theme.breakpoints.down('sm')]: {
            '&.malign-center': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            },
            '&.malign-right': {
                right: 0
            },
            '&.malign-left': {
                //left: 0
            }
        }
    }
});

let aC = 0;

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

type Props = {
    index?: number;
    //content: CycleText;
    onLoaded?: Function;
    transformations: ImageTransformations;
} & CmsContent;

const CycleTextBanner: React.FC<Props> = ({
    classes,
    className,
    heroImage,

    cycleText,
    desktopPlacement,
    desktopTextAlignment,
    mobileTextAlignment,
    verticalAlignment,

    eyebrowText,
    staticBold,
    subText,

    cycleCadence,
    onLoaded,
    transformations,
    ...other
}) => {


    const [mainImageLoading, setMainImageLoading] = useState(true);
    const imageRef = useRef<any>();

    const handleImageLoaded = () => {
        setMainImageLoading(false);
        if(onLoaded instanceof Function){
            onLoaded(imageRef);
        }
    };

    const { img } = heroImage || {};

    transformations ? transformations : {
        ...img?.image,
        upscale: false,
        strip: true,
        quality: 80,
        width: 1440,
        height: 600,
        scaleMode: !heroImage?.disablePoiAspectRatio 
            ? ImageScaleMode.CROP 
            : undefined,
        scaleFit: !heroImage?.disablePoiAspectRatio 
            && img?.image?.poi 
            && img?.image?.poi.x != -1 
            && img?.image?.poi.y != -1
            ? ImageScaleFit.POINT_OF_INTEREST
            : undefined,
    };
        

    // Cycle Text functions TODO: make cycletext its own component? 
    const [activeText, setActiveText] = useState(cycleText);

    const cycling = () => {
        cycleText.map((t : txt , i: number) => {
            t.active = false;
            if(i === aC) t.active = true;
        });
        
        let update = cycleText.map((t : txt) => t);
        setActiveText(update);
        
        aC = ((aC+1) % (cycleText.length));
    }
    
    useEffect(() => {

        const interval = setInterval(() => {
            cycling()
          }, cycleCadence);

        return () => {
            clearInterval(interval);
        }
    });

    return (
        <div className={`${clsx(classes.cycleParent, 'cycle-parent')}`}>
            <div className={`${clsx(classes.imgPane, 'cycle-image')}`} style={{ display: `${mainImageLoading ? "none" : "block"}` }}>
                {mainImageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
                <TrueAdaptiveImage
                    ref={imageRef}
                    onLoad={() => handleImageLoaded()}
                    image={ heroImage.img.image.image}
                    transformations={transformations}
                />
            </div>
            <div 
                className={`${classes.textBox}
                            cycle-text-box  
                            place-${desktopPlacement} 
                            align-${desktopTextAlignment} 
                            malign-${mobileTextAlignment}`}>
                <div className={`${classes.textCell} valign-${verticalAlignment}`}>
                    <Typography variant="h3">
                        {eyebrowText}
                    </Typography>
                    <Typography variant="h2">
                        {staticBold}
                    </Typography>
                    <ul className={`
                        ${classes.cycleUL} 
                        align-${desktopTextAlignment} 
                        malign-${mobileTextAlignment}
                    `}>
                    {
                        cycleText.map((txt: txt, index: number) => {
                            return <li 
                                    key={`${index}-ct`} 
                                    className={`
                                        align-${desktopTextAlignment} 
                                        malign-${mobileTextAlignment}
                                        ${classes.cycleLI}${activeText[index].active ? ' active' : ''}
                                    `}
                                    >
                                <Typography variant="h2">
                                    {txt.text}
                                </Typography>
                            </li>
                        })
                    }
                    </ul>
                    <Typography variant="h4">
                        {subText}
                    </Typography>
                </div>
            </div>   
        </div>
            
    );
}

export default withStyles(styles)(CycleTextBanner);