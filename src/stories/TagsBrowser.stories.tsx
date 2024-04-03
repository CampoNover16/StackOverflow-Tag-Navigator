import { StoryObj, Meta } from '@storybook/react';
import TagsBrowser from '../components/TagsBrowser';

export default {
  title: 'Components/TagsBrowser',
  component: TagsBrowser,
} as Meta;

const Template: StoryObj = (args) => <TagsBrowser {...args} />;

export const Default = Template.bind({});
Default.args = {};
