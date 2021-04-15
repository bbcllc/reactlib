import { ReactNode } from 'react';

export interface ICookiePopupProps {
  localStorageKey?: string;
  buttonText?: string;
  title?: ReactNode;
  agreement?: ReactNode;
}
