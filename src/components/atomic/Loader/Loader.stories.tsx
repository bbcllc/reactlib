import { Meta, Story } from '@storybook/react';
import React from 'react';
import { AiOutlineAlert } from 'react-icons/ai';
import '../../../styles/atomic/loader/loader.scss';
import Loader from './Loader';
import { ILoaderProps } from './loaderTypes';

const Template: Story<React.PropsWithChildren<ILoaderProps>> = (args) => (
  <Loader {...args} />
);

export const Default = Template.bind({});

export const CustomMessage = Template.bind({});
CustomMessage.args = { message: 'Opening your file' };

export const HideDots = Template.bind({});
HideDots.args = { hideDots: true };

export const WithIcon = Template.bind({});
WithIcon.args = { children: <AiOutlineAlert /> };

export const NotCentered = Template.bind({});
NotCentered.args = { center: false, children: <AiOutlineAlert /> };
NotCentered.parameters = { layout: 'padded' };

export default {
  title: 'Components/Atomic/Loader',
  component: Loader,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
