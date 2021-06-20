import React from 'react';

const Button = ({
  type = 'default',
  loading = false,
  onClick,
  htmlType,
  children,
  icon,
  ...props
}: React.PropsWithChildren<IButtonProps>): React.ReactElement => {
  return (
    <button
      onClick={onClick}
      className={`custom-button ${type}`}
      type={htmlType}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
};

interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  onClick?: () => void;
  loading?: boolean;
  type?: 'default' | 'alt' | 'text';
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  icon?: React.ReactNode;
}

export default Button;
