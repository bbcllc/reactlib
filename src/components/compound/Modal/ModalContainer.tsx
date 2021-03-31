import React from 'react';
import ModalHeader from './ModalHeader';
import {
  IModalContainerProps,
  IModalHeaderProps,
  ModalContext,
} from './modalTypes';

const ModalContainer: React.FC<IModalContainerProps> & {
  Header: React.FC<IModalHeaderProps>;
} = ({ children, ...props }): React.ReactElement => {
  return (
    <ModalContext.Provider value={props}>
      <div className="modal-wrapper">
        <div className="modal-container">{children}</div>
      </div>
    </ModalContext.Provider>
  );
};

ModalContainer.Header = ModalHeader;

export default ModalContainer;
