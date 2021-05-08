import React from 'react';
import { IFormPageProps } from './formTypes';

const FormPage = ({
  title,
  subtitle,
  description,
  footer,
  children,
}: React.PropsWithChildren<IFormPageProps>): React.ReactElement => {
  return (
    <div className="form-page-wrapper">
      {title && <div className="form-page-title">{title}</div>}
      {subtitle && <div className="form-page-subtitle">{subtitle}</div>}
      {description && (
        <div className="form-page-description">{description}</div>
      )}
      <div className="form-page-container">{children}</div>
      {footer && <div className="form-page-footer">{footer}</div>}
    </div>
  );
};

export default FormPage;
