import React, { useEffect, useState } from 'react';
import { WithStyles, Theme } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { CmsImage, ImageScaleFit, ImageScaleMode, ImageTransformations } from '@utils/getImageURL';
import clsx from 'clsx';
import CardEnhanced from '../CardEnhanced';
import CycleTextBanner from '../CycleText';

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
            height: 'auto'
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
    cards: {
        height: '600px',
        overflow: 'hidden',
        position: 'absolute' as 'absolute',
        top: 0,
        width: '70%',
        '&.place-left': {
            right: 0
        },
        '&.place-right': {
            left: 0
        },
        [theme.breakpoints.down('sm')]: {
            height: '400px',
            position: 'static' as 'static',
            width: '100%'
        },
        [theme.breakpoints.down('xs')]: {
            height: '300px',
            top: '300px',
            width: '100%'
        }
    },
    cardUL: {
        position: 'relative' as 'relative',
        margin: 0,
        padding: 0,
        height: '100%'
    },
    cardLI : {
        display: 'inline-block',
        opacity: 0,
        position: 'absolute' as 'absolute',
        transition: `opacity 800ms ${theme.transitions.easing.easeInOut}, transform 300ms ${theme.transitions.easing.easeInOut}`,
        height: '100%',
        '& > a': {
            display: 'block',
            height: '100%'
        },
        '& .hover, & .blend': {
            //textAlign: 'left',
            opacity: 0,
            '& .t-pane': {
                background: 'rgba(255,255,255,0.5)',
                padding: '20px',
                width: 'auto',
                borderRadius: '7px'
            }
        },
        '& img, & .img-place': {
            height: '100%',
            width: 'auto'
        },
        '&.anim-fade': {
            opacity: 1
        },
        '&.slideleft': {
            opacity: 0,
            transform: 'translate(-1000px, 0)'
        },
        '&.anim-slideleft': {
            transform: 'translate(0, 0)',
            opacity: 1
        },
        '&.slideright': {
            opacity: 0,
            transform: 'translate(1000px, 0)'
        },
        '&.anim-slideright': {
            transform: 'translate(0, 0)',
            opacity: 1
        },
        '&.slideup': {
            opacity: 0,
            transform: 'translate(0, 800px)'
        },
        '&.anim-slideup': {
            transform: 'translate(0, 0)',
            opacity: 1
        },
        '&.slidedown': {
            opacity: 0,
            transform: 'translate(0, -800px)'
        },
        '&.anim-slidedown': {
            transform: 'translate(0, 0)',
            opacity: 1
        }
    },
    linksDiv: {
        position: 'absolute' as 'absolute',
        bottom: '48px',
        right: '32px'
    },
    links: {
        backgroundColor: 'rgba(0,0,0, 0.6)',
        color: 'white',
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

    cards: Card[];
    CycleText: CycleText;
    animation: string;
    animationSpeed: number;

    shiftCSS: number;
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

const SliceCardBanner: React.FC<Props> = props => {
    const cardParent = React.createRef<HTMLUListElement>();
    const cardElement = React.createRef<HTMLLIElement>();

    const {
        classes,
        className,
        cards,
        animation,
        animationSpeed,
        CycleText,
        shiftCSS,
        ...other
    } = props;

    let total = 0;

    const handleCardImageLoaded = (index: number) => {
        total++;
        console.log('card '+ index + ' image loaded')
        if(total == cards.length) {
            window.dispatchEvent(new Event('resize'));
            showCards();
        }
    }

    let state = {
        cardParentW: 0,
        cardW: 0
    }
    
    const [offset, setOffset] = useState(90);
    const [cardShift, setShift] = useState(0);
    
    const draw = () => {
        if(cardParent && cardElement){
            state.cardParentW = measureElement(cardParent).width;
            state.cardW = measureElement(cardElement).width;
            setOffset(Math.ceil((state.cardParentW - state.cardW) / (cards.length - 1)));
            setShift(state.cardW - offset);
            //shiftCSS = cardShift;
        }
    }

    const activateCard = (c : any) => {
        //shift card(s) AFTER this one
        let startIndex = Number(c.currentTarget.dataset.id)

        cards.map(card => {
            card.shift = false;
            if(card.id > startIndex){
                card.shift = true;
            }
        });
        let update = cards.map((card) => card);

        setAllCards(update);
    }

    let hidden : Array<number> = [];

    cards.map((card, i) => {
        card.id = i;
        hidden.push(i);
    });
    
    let C = cards;
    const [allCards, setAllCards] = useState(cards);
    
    const showCards = () => {
    
        if(hidden.length > 0) {
            let i = Number(hidden.splice(0,1));
            let card = cards[i];
            
            if(card.show) return;
            
            card.show = true;

            let update = C.map((c) =>
                c.id === card.id ? card : c
            );

            setAllCards(update);
            
            setTimeout( function(){showCards()}, animationSpeed);
        }
    }
    
    useEffect(() => {
        draw();
        showCards();

        window.addEventListener('resize', draw);
        return () => {
            window.removeEventListener('resize', draw);
        }
    });

    return (
        <div className={clsx(classes.root, className)} {...other}>
            <div className={classes.sliceParent}>

                <CycleTextBanner {...CycleText} />
                
                <div className={`${classes.cards} place-${CycleText.desktopPlacement}`}>
                    <ul ref={cardParent} className={`${classes.cardUL}`}>
                           
                        {
                            C.map((card, index) => {
                                
                                const { img } = card.image || {};

                                const cardtransformations: ImageTransformations = {
                                    ...img?.image,
                                    upscale: true,
                                    strip: true,
                                    quality: 80,
                                    width: 430,
                                    height: 600,
                                    scaleMode: !card.image?.disablePoiAspectRatio 
                                        ? ImageScaleMode.CROP 
                                        : undefined,
                                    scaleFit: !card.image?.disablePoiAspectRatio 
                                        && img?.image?.poi 
                                        && img?.image?.poi.x != -1 
                                        && img?.image?.poi.y != -1
                                        ? ImageScaleFit.POINT_OF_INTEREST
                                        : undefined,
                                };

                                let shiftStyle;
                                if(allCards[index].shift){
                                    shiftStyle = {
                                        transform: `translate(${cardShift}px, 0)`,
                                        left: index*offset+'px'
                                    }
                                }else{
                                    shiftStyle = {
                                        left: index*offset+'px'
                                    }
                                }
                            
                                var newCSS = shiftStyle as React.CSSProperties ;

                                return <li 
                                        ref={cardElement}
                                        key={`${index}-card`}  
                                        className={`
                                            ${classes.cardLI} 
                                            ${classes.cardLI}-card-${index} 
                                            ${animation}
                                            ${allCards[index].show ? ' anim-' + animation : ''}
                                            ${allCards[index].shift ? ' shift' : ''}
                                        `} 
                                        data-id={index} 
                                        onMouseEnter={activateCard.bind(allCards[index])} 
                                        onTouchStart={activateCard.bind(allCards[index])} 
                                        style={newCSS}
                                    >

                                    <CardEnhanced 
                                        {...card} 
                                        index={index} 
                                        onImageLoad={handleCardImageLoaded}
                                        transformations={cardtransformations}
                                        />
                                    
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(SliceCardBanner);