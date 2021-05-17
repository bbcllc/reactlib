import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../../atomic';
import Menu, { IMenuProps } from './Menu';

const Template: Story<
  React.PropsWithChildren<IMenuProps> & {
    rightPos?: number;
    topPos?: number;
    leftPos?: number;
    bottomPos?: number;
    buttonRight?: boolean;
    buttonBottom?: boolean;
    hideItems?: boolean;
  }
> = ({
  isOpen,
  setIsOpen,
  topPos,
  leftPos,
  bottomPos,
  rightPos,
  buttonRight,
  buttonBottom,
  hideItems,
  children,
  title = 'Menu Title',
  ...args
}) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <div
      style={{
        position: 'relative',
        ...(buttonRight && { textAlign: 'right' }),
        ...(buttonBottom && { marginTop: '20rem' }),
      }}
    >
      <Button
        style={{
          width: 200,
        }}
        onMouseDown={() => setOpen((prev) => !prev)}
      >
        {open ? 'Close' : 'Open'}
      </Button>
      {open && (
        <Menu
          style={{
            top: topPos,
            bottom: bottomPos,
            left: leftPos,
            right: rightPos,
          }}
          isOpen={open}
          setIsOpen={setOpen}
          title={title}
          {...args}
        >
          {!hideItems && (
            <>
              <Menu.Item>Thing 1</Menu.Item>
              <Menu.Item>Thing 2</Menu.Item>
              <Menu.Item>Thing 3</Menu.Item>
            </>
          )}
        </Menu>
      )}
    </div>
  );
};

export const RightMenu = Template.bind({});
RightMenu.args = {
  isOpen: true,
  leftPos: 210,
  topPos: 0,
  right: true,
};

export const LeftMenu = Template.bind({});
LeftMenu.args = {
  isOpen: true,
  rightPos: 210,
  topPos: 0,
  buttonRight: true,
  left: true,
};

export const BottomMenu = Template.bind({});
BottomMenu.args = {
  isOpen: true,
  topPos: 45,
  bottom: true,
};

export const TopMenu = Template.bind({});
TopMenu.args = {
  isOpen: true,
  bottomPos: 45,
  top: true,
  buttonBottom: true,
};

export const MenuAsTooltip = Template.bind({});
MenuAsTooltip.args = {
  isOpen: true,
  topPos: 45,
  bottom: true,
  hideItems: true,
};

export default {
  title: 'Components/Compound/Menu',
  component: Menu,
} as Meta;
