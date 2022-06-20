import React, { FC } from 'react'
import { CmsContent } from '../../../lib/cms/CmsContent';
import { Image } from '../index';
import clsx from 'clsx';
import { CallToAction } from '../../cms-modern';
import { Typography } from '@material-ui/core';

type Props = {
    index?: number;
} & CmsContent;

const Card: FC<Props> = ({
    style,
    index = 0,
    links = [],
    image,
    cardName,
    description,
    link,
    textBackgroundColour
}) => {

    const content = <>
        <div className="amp-dc-card-img-wrap">
            <Image image={image} query={''} />
        </div>

        <div className={clsx('amp-dc-card-text-wrap', {
            ['amp-dc-hide']: !cardName && !description && !link,
            ['amp-dc-card-no-image']: !image
        })}>
            {
                cardName ? (
                    <Typography component="h2" variant="h2">
                        {cardName}
                    </Typography>
                ) : null
            }
            {
                description ? (
                    <p className="amp-dc-card-description">{description}</p>
                ) : null
            }
            {
                links.map((link : any) => {
                    if (link.label) {
                        return (
                            <CallToAction key={ Math.random().toString(36).substr(2, 9) } href={link.value} variant="contained" className="amp-dc-card-link">
                                {link.label}
                            </CallToAction>
                        )
                    } else {
                        return null;
                    }
                })
            }
        </div>
    </>;

    return (
        <div className={`amp-dc-card amp-dc-card-${index + 1} ${style || ''}`}>
            {
                links[0] ? (
                    <a className="amp-dc-card-wrap" href={links[0]?.value}
                        style={{background: textBackgroundColour}}>
                        {content}
                    </a>
                ) : (
                    <div className="amp-dc-card-wrap">
                        {content}
                    </div>
                )
            }
        </div>
    )
}

export default Card;