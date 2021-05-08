import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import '../../../styles/atomic/input/input.scss';
import Input from './Input';
import { IInputProps } from './inputTypes';

const Template: Story<IInputProps> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = { name: 'test', label: 'Test Input' };

export default {
  title: 'Components/Atomic/Input',
  component: Input,
  decorators: [
    (story) => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <div style={{ maxWidth: '400px' }}>{story()}</div>
        </FormProvider>
      );
    },
  ],
} as Meta;
