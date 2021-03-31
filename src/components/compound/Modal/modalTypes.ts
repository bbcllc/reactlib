import { createContext } from "react";

export interface IModalContainerProps {
  closeModal?: () => void;
}

export interface IModalHeaderProps {
  hideCloseButton?: boolean;
}

export const ModalContext = createContext<IModalContainerProps>({});
