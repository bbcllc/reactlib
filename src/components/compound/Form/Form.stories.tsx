import { Meta } from '@storybook/react';
import React from 'react';
import { Input } from '../../atomic';
import FormPage from './FormPage';
import FormWizard from './FormWizard';

export const Default = (): React.ReactElement => {
  return (
    <FormWizard<{
      test: string;
    }>>
      <Input name="test" placeholder="Test input" />
      <button type="submit">Submit</button>
    </FormWizard>
  );
};

export const MultiPage = (): React.ReactElement => {
  return (
    <FormWizard paged>
      <FormPage title="Title">
        <Input name="test" />
      </FormPage>
      <FormPage title="Page 2">
        <Input name="testpg2" />
        <button type="submit">Submit</button>
      </FormPage>
    </FormWizard>
  );
};

export default {
  title: 'Components/Compound/Form',
  component: FormWizard,
} as Meta;
