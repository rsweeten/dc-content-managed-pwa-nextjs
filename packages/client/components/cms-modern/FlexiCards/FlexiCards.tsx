import React, { useEffect } from 'react';
import { WithStyles, Theme, ImageList, ImageListItem } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
import CardEnhanced from '../CardEnhanced';
import { CmsImage, ImageScaleFit, ImageScaleMode, ImageTransformations } from '../../../utils/getImageURL';
import { Card } from '../../cms';

const styles = (theme: Theme) => ({
    root: {
        maxWidth: '1400px',
        margin: '20px auto',
        '& li': {
            height: 'auto !important'
        },
        '& h2': {
            fontSize: '14px',
            margin: '0'
        },
        '& .amp-dc-card-text-wrap': {
            padding: '10px'
        },
        '& .af-call-to-action-dark': {
            backgroundColor: 'transparent',
            color: '#000 !important',
            "&:hover": {
                backgroundColor: 'transparent !important',
                color: '#000 !important'
            }
        },
        '& .dir-row': {
            flexDirection: 'row'
        },
        '& .dir-row-reverse': {
            flexDirection: 'row-reverse'
        },
        '& .dir-column': {
            flexDirection: 'column'
        },
        '& .dir-column-reverse': {
            flexDirection: 'column-reverse'
        }
    }
});

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
    textAlignment: string;
    verticalAlignment: string;
    linkPosition: string;
    blend: string;
    mainText: string;
    subText: string;
    color: string;
    links: link[];
    cols: number;
    rows: number;
};

export type txt = {
    text: string;
    active: boolean;
}

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;

    cards: [];
    columns: number;
    rowHeight: number | "auto";
    gap: number;
}

const FlexiCards: React.FC<Props> = props => {

    const {
        classes,
        className,
        cards,
        columns,
        rowHeight,
        gap,
        ...other
    } = props;
    
    useEffect(() => {

        //window.addEventListener('resize', draw);
        return () => {
            //window.removeEventListener('resize', draw);
        }
    });

    return (
        <div className={`${clsx(classes.root, className)}`} {...other}>
            <ImageList cols={columns} rowHeight={rowHeight} gap={gap}>
                {
                    cards.map((card, index) => {

                        /* const { img } = card.image || {};

                        const ratio = (card.cols === card.rows) ? '1:1' : card.cols + ':' + card.rows ;

                        const cardtransformations: ImageTransformations = {
                            ...img?.image,
                            upscale: true,
                            strip: true,
                            quality: 80,
                            width: (400 * card.cols),
                            height: (imageSize == 'grid') ? 400 * card.rows : undefined,
                            aspectRatio: ratio,
                            scaleMode: ImageScaleMode.CROP, 
                            scaleFit: !card.image?.disablePoiAspectRatio 
                                && img?.image?.poi 
                                && img?.image?.poi.x != -1 
                                && img?.image?.poi.y != -1
                                ? ImageScaleFit.POINT_OF_INTEREST
                                : undefined,
                        } */
                            
                        return (
                            <ImageListItem key={Math.random().toString(36).substr(2, 9)} cols={1} rows={1}>
                                <Card key={Math.random().toString(36).substr(2, 9)} {...card} index={index} />
                            </ImageListItem>
                        )
                    })
                }
            </ImageList>
        </div>
    );
}

export default withStyles(styles)(FlexiCards);