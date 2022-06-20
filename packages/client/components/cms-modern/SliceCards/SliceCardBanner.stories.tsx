import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SliceCardBanner } from '@components/cms-modern';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/SimpleBannerExternal',
  component: SliceCardBanner,
  argTypes: {
    
  },
} as Meta;

const Template = (id: string) => {
  return (args: any) => {
    const overrideContent = (content: any) => {
      content.textPositioning.textPositionHorizontal = args.textPositionHorizontal ? args.textPositionHorizontal : '';
      content.textPositioning.textPositionVertical = args.textPositionVertical ? args.textPositionVertical : '';
      return {
        ...content,
        content: content
      }
    };
    return <ContentBlockStory request={{id}} overrideContent={overrideContent} />;
  }
}

export const ExampleContent = Template('d5f7ec38-5a18-4c3a-9f10-1ab69774b582');
