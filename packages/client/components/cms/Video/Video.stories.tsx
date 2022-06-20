import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Video from '@components/cms/Video';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/Video',
  component: Video,
} as Meta;

export const ExampleContent: Story = (args) => <ContentBlockStory request={{id: '1087509c-5887-47ec-8228-a5de8a997181'}} />;
