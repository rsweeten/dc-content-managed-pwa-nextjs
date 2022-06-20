import React, { useContext, useMemo } from 'react';
import { ImageTransformations, getImageURL } from '../../utils/getImageURL';
import { AdaptiveImageContext } from './AdaptiveImage';

interface Props extends React.DetailedHTMLProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement> {
    transformations?: ImageTransformations;
}

const AdaptiveImageSource: React.SFC<Props> = (props) => {
    const {
        transformations,
        ...other
    } = props;

    const {
        image,
        transformations: rootTransformations
    } = useContext(AdaptiveImageContext) || {};

    if (!image) {
        return null;
    }

    const [imageUrl, imageUrl2x] = useMemo(() => {
        const params = {
            ...rootTransformations,
            ...transformations
        };

        return [
            getImageURL(image, params),
            getImageURL(image, {
                ...params,
                width: params.width ? params.width * 2 : undefined,
                height: params.height ? params.height * 2 : undefined
            })
        ]
    }, [image, rootTransformations, transformations]);



    return (
        <source srcSet={`${imageUrl} 1x, ${imageUrl2x} 2x`} src={imageUrl} {...other} />
    );
};

export default AdaptiveImageSource;