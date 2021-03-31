import { useContext } from 'react';
import { ModalContext } from './ModalContainer';
import { IModalContainerProps } from './modalTypes';

const useModal = (): IModalContainerProps & {} => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Cannot use modal context outside of a Modal container!');
  }

  return {
    ...context,
  };
};

export default useModal;
