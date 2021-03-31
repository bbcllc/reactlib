import React, { createContext } from 'react';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import { IModalContainerProps } from './modalTypes';
import useModal from './useModal';

export const ModalContext = createContext<IModalContainerProps | undefined>(
  undefined
);

const ModalContainer = ({
  children,
  ...props
}: React.PropsWithChildren<IModalContainerProps>): React.ReactElement => {
  return (
    <ModalContext.Provider value={props}>
      <div className="modal-wrapper">
        <div className="modal-container">{children}</div>
      </div>
    </ModalContext.Provider>
  );
};

// Add the other elements to the ModalContainer
ModalContainer.Header = ModalHeader;
ModalContainer.Body = ModalBody;
ModalContainer.Footer = ModalFooter;
ModalContainer.useModal = useModal;

export default ModalContainer;
