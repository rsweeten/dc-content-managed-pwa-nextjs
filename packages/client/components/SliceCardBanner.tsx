import React, { useEffect, useState } from 'react';
import { WithStyles, Theme, Typography, PropTypes } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { getImageURL, ImageScaleMode } from '../utils/getImageURL';
import clsx from 'clsx';

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
        width: '100%',
        paddingBottom: '60%'
    },
    imgPane: {
        height: '100%',
        position: 'relative' as 'relative',
        width: '100%'
    },
    mainImage: {
        height: '100%',
        width: 'auto'
    },
    textBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        padding: '40px',
        position: 'absolute' as 'absolute',
        width: '30%',
        top: 0,
        display: 'table' as 'table',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '250px',
            width: '100%'
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
        margin: '0 0 76px -38px',
        position: 'relative' as 'relative',
        '&.align-center': {
            display: 'flex',
            justifyContent: 'center'
        },
    },
    cycleLI: {
        borderBottom: '2px solid #000000',
        display: 'inline-block',
        fontStyle: 'italic',
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
        }
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
            height: '330px',
            top: '275px',
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
        '& img': {
            height: '100%'
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
        },
        '&.shift': (props) => ({
            transform: 'translate(${props.cardShift}px, 0)'
        }),
        [theme.breakpoints.down('sm')]: {
            '&.shift': {
                transform: `translate(176px, 0)`
            }
        },
        [theme.breakpoints.down('sm')]: {
            '&.shift': {
                transform: `translate(176px, 0)`
            }
        },
        [theme.breakpoints.up('md')]: {
            '&.shift': {
                transform: `translate(348px, 0)`
            }
        },
        [theme.breakpoints.up('lg')]: {
            '&.shift': {
                transform: `translate(326px, 0)`
            }
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

const measureElement = el => {
    return {
        width: el.current.offsetWidth,
        height: el.current.offsetHeight
    };
}

let aC = 0;

export type link = {
    label: string;
    type: string;
    value: string;
}

export type img = {
    id: string;
    name: string;
    endpoint: string;
    defaultHost: string;
}

export type Card = {
    image: {
        image: img;
        title: string;
        imageAltText: string;
        seoText: string;
        display: string;
    };
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
    heroImage: img;

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

    cardShift: number;
}

const SliceCardBanner: React.FC<Props> = props => {
    const cardParent = React.createRef<HTMLUListElement>();
    const cardElement = React.createRef<HTMLImageElement>();

    const {
        classes,
        className,
        cards,
        animation,
        animationSpeed,
        CycleText,
        //cardShift,
        ...other
    } = props;

    const mainImage = getImageURL(CycleText.heroImage, {
        width: 1440,
        height: 600,
        scaleMode: ImageScaleMode.CROP
    });

    let total = 0;

    const handleCardImageLoaded = () => {
        total++;
        if(total == cards.length) {
            window.dispatchEvent(new Event('resize'));
            showCards();
        }
    }

    let state = {
        cardParentW: 0,
        cardW: 0
    }
    
    const [offset, setOffset] = useState(100);
    const [cardShift, setShift] = useState(0);
    
    const draw = () => {
        state.cardParentW = measureElement(cardParent).width;
        state.cardW = measureElement(cardElement).width;
        setOffset(Math.ceil((state.cardParentW - state.cardW) / (cards.length - 1)));
        setShift(state.cardW - offset);
    }

    const activateCard = (c) => {
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

    let hidden = [];

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

    const [activeText, setActiveText] = useState(CycleText.cycleText);

    const cycling = () => {
        CycleText.cycleText.map((t, i) => {
            t.active = false;
            if(i === aC) t.active = true;
        });
        
        let update = CycleText.cycleText.map((t) => t);
        setActiveText(update);
        
        aC = ((aC+1) % (CycleText.cycleText.length));
    }
    
    useEffect(() => {
        //cycling();
        draw();
        showCards();

        const interval = setInterval(() => {
            cycling()
          }, CycleText.cycleCadence);

        window.addEventListener('resize', draw);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', draw);
        }
    });

    return (
        <div className={clsx(classes.root, className)} {...other}>
            <div className={classes.cycleParent}>
                <div className={classes.imgPane}>
                    <picture>
                        <img className={classes.mainImage} src={mainImage} alt={CycleText.heroImage.name} />
                    </picture>
                </div>
                <div 
                    className={`${classes.textBox} 
                                place-${CycleText.desktopPlacement} 
                                align-${CycleText.desktopTextAlignment} 
                                malign-${CycleText.mobileTextAlignment}`}>
                    <div className={`${classes.textCell} valign-${CycleText.verticalAlignment}`}>
                        <Typography variant="overline">
                            {CycleText.eyebrowText}
                        </Typography>
                        <Typography variant="h3">
                            {CycleText.staticBold}
                        </Typography>
                        <ul className={`
                            ${classes.cycleUL} 
                            align-${CycleText.desktopTextAlignment} 
                            malign-${CycleText.mobileTextAlignment}
                        `}>
                        {
                            CycleText.cycleText.map((txt, index) => {
                                return <li 
                                        key={`${index}-ct`} 
                                        className={`
                                            align-${CycleText.desktopTextAlignment} 
                                            malign-${CycleText.mobileTextAlignment}
                                            ${classes.cycleLI}${activeText[index].active ? ' active' : ''}
                                        `}
                                        >
                                    <Typography variant="h3">
                                        {txt.text}
                                    </Typography>
                                </li>
                            })
                        }
                        </ul>
                        <Typography variant="h5">
                            {CycleText.subText}
                        </Typography>
                    </div>
                </div>
                <div className={`${classes.cards} place-${CycleText.desktopPlacement}`}>
                    <ul ref={cardParent} className={`${classes.cardUL}`}>
                           
                        {
                            C.map((card, index) => {
                                
                                const imageUrl = getImageURL(card.image.image);

                                return <li 
                                        key={`${index}-card`}  
                                        className={`
                                            ${classes.cardLI} 
                                            ${classes.cardLI}-card-${index} 
                                            ${animation}
                                            ${allCards[index].show ? ' anim-' + animation : ''}
                                            ${allCards[index].shift ? ' shift' : ''}
                                        `} 
                                        data-id={index} 
                                        onMouseOver={activateCard.bind(allCards[index])} 
                                        onTouchStart={activateCard.bind(allCards[index])} 
                                        style={{left: index*offset+'px'}}
                                    >
                                    <img 
                                        src={imageUrl} 
                                        ref={cardElement}
                                        onLoad = { handleCardImageLoaded.bind([]) } 
                                        alt={card.image.imageAltText} 
                                        title={card.image.seoText} />
                                    <div className={classes.linksDiv}>
                                        {
                                            card.links.map((link, index) => {
                                                return <a className={classes.links} key={`${index}-cta`} href={link.value}>{link.label}</a>
                                            })
                                        }
                                    </div>
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