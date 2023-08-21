import { Meta, Story } from '@storybook/react';
import Heading, { HeadingElementProps } from './Heading';

export default {
  title: 'Heading',
  component: Heading,
} as Meta;

const Template = (args: HeadingElementProps) => <Heading {...args} />;

export const h1: Story = Template.bind({});
h1.args = {
  text: { value: 'Heading 1' },
  level: 1,
};

export const h2: Story = Template.bind({});
h2.args = {
  text: { value: 'Heading 2' },
  level: 2,
};

export const h3: Story = Template.bind({});
h3.args = {
  text: { value: 'Heading 3' },
  level: 3,
};

export const h4: Story = Template.bind({});
h4.args = {
  text: { value: 'Heading 4' },
  level: 4,
};

export const h5: Story = Template.bind({});
h5.args = {
  text: { value: 'Heading 5' },
  level: 5,
};

export const h6: Story = Template.bind({});
h6.args = {
  text: { value: 'Heading 6' },
  level: 6,
};
