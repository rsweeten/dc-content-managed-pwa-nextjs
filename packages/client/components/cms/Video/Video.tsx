import React, { FC } from 'react'
import { CmsContent } from '../../../lib/cms/CmsContent';

type Props = {
} & CmsContent;

const Video: FC<Props> = ({
    video
}) => {
    if (!video) {
        return null;
    }

    return (
        <div className='amp-dc-video-wrap'>
            <video className="amp-dc-video" poster={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}?protocol=https`}
                controls src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}>
                <source src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_720p?protocol=https`}
                    data-res="High" data-bitrate="2119" data-label="High"
                    type="video/mpeg4" />

                <source src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/mp4_480p?protocol=https`}
                    data-res="Medium" data-bitrate="689" data-label="Medium"
                    type="video/mpeg4" />

                <source src={`https://${video.defaultHost}/v/${video.endpoint}/${video.name}/webm_480p?protocol=https`}
                    data-res="Medium" data-bitrate="624" data-label="Medium"
                    type="video/webm" />
            </video>
            <div className="pause-button inactive"></div>
        </div>
    )
}

export default Video;