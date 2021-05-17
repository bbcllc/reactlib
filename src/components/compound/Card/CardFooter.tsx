import React from 'react';

const CardFooter = ({
  children,
  hideDivider = false,
  right = false,
}: React.PropsWithChildren<ICardFooterProps>): React.ReactElement => {
  return (
    <div
      className={`card-footer\
      ${hideDivider ? ' hide-divider' : ''}\
      ${right ? ' right-align' : ''}\
      `}
    >
      {children}
    </div>
  );
};

export interface ICardFooterProps {
  hideDivider?: boolean;
  right?: boolean;
}

export default CardFooter;
