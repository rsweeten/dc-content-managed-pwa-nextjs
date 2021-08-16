import React, { useEffect, useState } from 'react';
import { WithStyles, Theme, Typography, PropTypes } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { getImageURL, ImageScaleMode } from '../utils/getImageURL';
import clsx from 'clsx';

const styles = (theme: Theme) => ({
    root: {
        width: '100%',
        maxWidth: '1440px',
        margin: '20px 40px',
        display: 'flex'
    },
    card: {
        
    },
    linksDiv: {
        position: 'absolute' as 'absolute',
        bottom: '48px',
        right: '32px',
        '& a': {
            display: 'block',
            fontSize: '18px',
            padding: '6px 20px',
            fontWeight: 'bold' as 'bold',
            textTransform: 'uppercase' as 'uppercase',
            transition: 'all 200ms',
            '&:hover': {
                backgroundColor: 'rgba(255,255,255, 0.6)',
                color: 'black'
            }
        }
    }
});

export type link = {
    label: string;
    type: string;
    value: string;
}

export type img = {
    image: {
        aspectLock: string;
        query: string;
        image: {
            id: string;
            name: string;
            endpoint: string;
            defaultHost: string;
        }
    }
}

export type Card = {
    image: {
        image: img;
        imageAltText: string;
        seoText: string;
        disablePoiAspectRatio: boolean;
    };
    textAlignment: string;
    verticalAlignment: string;
    linkPosition: string;
    blend: string;
    mainText: string;
    subText: string;
    color: string;
    links: link[];
};

export type txt = {
    text: string;
    active: boolean;
}

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;

    cards: Card[];
    mainCard: Card;

    orientation: string;
    mobileDisplay: string;
    textAlignment: string;
    verticalAlignment: string;
    linkPosition: string;
}

const FourOne: React.FC<Props> = props => {

    const {
        classes,
        className,
        cards,
        mainCard,
        orientation,
        mobileDisplay,
        textAlignment,
        verticalAlignment,
        linkPosition,
        ...other
    } = props;

    //const mainImage = getImageURL(mainCard.image);

    let total = 0;
    const handleCardImageLoaded = () => {
        total++;
        if(total == cards.length) {
            window.dispatchEvent(new Event('resize'));
        }
    }
    
    useEffect(() => {

        //window.addEventListener('resize', draw);
        return () => {
            //window.removeEventListener('resize', draw);
        }
    });

    return (
        <div className={`${clsx(classes.root, className)} ${orientation}-layout`} {...other}>
            <div>
                {mainCard}
            </div>
            <div>

            </div>
        </div>
    );
}

export default withStyles(styles)(FourOne);