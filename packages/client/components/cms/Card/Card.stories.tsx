import React from 'react';
import { Story, Meta } from '@storybook/addon-docs/blocks';

import { Card } from '../../cms';
import ContentBlockStory from '../../../utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/Card',
  component: Card,
} as Meta;

export const ExampleContent: Story = (args) => <ContentBlockStory request={{key: "cards/card1"}} />;
