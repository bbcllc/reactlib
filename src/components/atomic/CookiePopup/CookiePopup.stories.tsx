import { Meta, Story } from '@storybook/react';
import React from 'react';
import '../../../styles/atomic/cookiePopup/cookiePopup.scss';
import CookiePopup from './CookiePopup';
import { ICookiePopupProps } from './cookiePopupTypes';

const Template: Story<ICookiePopupProps> = (args) => <CookiePopup {...args} />;

const STORAGE_KEY = 'storybookLocalStorageKey';

export const Basic = Template.bind({});
Basic.args = { localStorageKey: STORAGE_KEY };

export default {
  title: 'Components/Atomic/CookiePopup',
  component: CookiePopup,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: '#40537f',
          minHeight: window.innerHeight,
          minWidth: window.innerWidth,
          position: 'relative',
        }}
      >
        <button
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
          }}
        >
          Reset Story
        </button>
        {story()}
      </div>
    ),
  ],
} as Meta;
