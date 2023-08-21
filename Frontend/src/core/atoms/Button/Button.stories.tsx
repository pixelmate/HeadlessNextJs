import { Meta, Story } from '@storybook/react';
import Button, { ButtonElement } from './Button';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template = (args: ButtonElement) => <Button {...args} />;

export const Primary: Story = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  btnType: 'primary',
};

export const Secondary: Story = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  btnType: 'secondary',
};
