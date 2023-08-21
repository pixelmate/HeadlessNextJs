import { Meta, Story } from '@storybook/react';
import BlogOverview, { BlogOverviewProps } from './BlogOverview';

export default {
  title: 'BlogOverview',
  component: BlogOverview,
} as Meta;

const Template = (args: BlogOverviewProps) => <BlogOverview {...args} />;

export const Primary: Story = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  btnType: 'primary',
};
