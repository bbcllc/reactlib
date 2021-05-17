import React, { useContext } from 'react';
import CardContext from './CardContext';

const CardBody = ({
  children,
}: React.PropsWithChildren<ICardBodyProps>): React.ReactElement => {
  const { bodyRef } = useContext(CardContext);
  return (
    <div ref={bodyRef} className="card-body">
      {children}
    </div>
  );
};

export interface ICardBodyProps {}

export default CardBody;
