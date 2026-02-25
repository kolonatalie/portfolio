import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useSound } from '@/hooks/useSound';
import clickSound from '@/assets/sounds/mouse-click.mp3';

import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  children: React.ReactNode;
  href?: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  href,
  to,
  target,
  onClick,
  ...props
}) => {

  const playClick = useSound(clickSound, 0.2);
  
  const commonClasses = clsx(styles.btn, styles[variant], className);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    playClick(); 
    if (onClick) {
      onClick(e);
    }
  };

  if (to) {
    return <Link to={to} className={commonClasses}>{children}</Link>;
  }

  if (href) {
    return (
      <a 
      href={href} 
      className={commonClasses} 
      target={target} 
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={commonClasses}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;