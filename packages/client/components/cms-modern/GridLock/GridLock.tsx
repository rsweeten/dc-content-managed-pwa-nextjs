import React, { useEffect } from 'react';
import { WithStyles, Theme, ImageList, ImageListItem } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
import CardEnhanced from '../CardEnhanced';
import { CmsImage, ImageScaleFit, ImageScaleMode, ImageTransformations } from '../../../utils/getImageURL';
import { CmsContent } from '../../../lib/cms/CmsContent';

const styles = (theme: Theme) => ({
    root: {
        maxWidth: '1400px',
        margin: `${theme.spacing(2)}px auto`,
        display: 'grid',
        '& .amp-tile, & .img-place, & img': {
            height: '100%'
        }
    }
});

type Props = {
    index?: number;
    columns: number;
    gap: number;
} & CmsContent;

const GridLock: React.FC<Props> = props => {

    const {
        classes,
        className,
        cards,
        columns,
        gap,
        direction,
        ...other
    } = props;
    
    useEffect(() => {

        //window.addEventListener('resize', draw);
        return () => {
            //window.removeEventListener('resize', draw);
        }
    });

    let gridStyle = {
        gridTemplateColumns: `repeat(${columns}, 1fr)`, 
        gap: `${gap}px`,
        direction: `${(direction == 'reverse') ? 'rtl': 'ltr'}`
    };

    var gridCSS = gridStyle as React.CSSProperties ;

    return (
        
        <div className={`${clsx(classes.root, className)}`} {...other} style={gridCSS}>
            
                {   
                    cards.map((item: any, index: number) => {

                        if(!item.card) return;

                        const { img } = item.card.image || {};

                        const ratio = (item.cols === item.rows) ? '1:1' : item.cols + ':' + item.rows ;

                        const cardtransformations: ImageTransformations = {
                            ...img?.image,
                            upscale: true,
                            strip: true,
                            quality: 80,
                            width: (400 * item.cols),
                            height: 400 * item.rows,
                            aspectRatio: ratio,
                            scaleMode: ImageScaleMode.CROP, 
                            scaleFit: !item.card.image?.disablePoiAspectRatio 
                                && img?.image?.poi 
                                && img?.image?.poi.x != -1 
                                && img?.image?.poi.y != -1
                                ? ImageScaleFit.POINT_OF_INTEREST
                                : undefined,
                        } 

                        let gridItemStyle = {
                            gridColumnEnd: `span ${item.cols}`,
                            gridRowEnd: `span ${item.rows}`
                        };
                    
                        var itemCSS = gridItemStyle as React.CSSProperties ;
                    
                            
                        return (
                            <div key={Math.random().toString(36).substr(2, 9)} style={itemCSS}>
                                <CardEnhanced {...item.card} index={index} style={itemCSS} transformations={cardtransformations} />
                            </div>
                        )
                    })
                }
        </div>
    );
}

export default withStyles(styles)(GridLock);