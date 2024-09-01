import React, { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from '@/ui/Dropdown/Dropdown.module.css';

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: number[];
  variant?: 'default' | 'outlined' | 'contained';
  scale?: 'xs' | 'sm' | 'md' | 'lg';
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  variant = 'outlined',
  scale = 'lg',
  className,
  ...props
}) => {
  return (
    <select
      {...props}
      className={clsx(
        styles.dropdownButton,
        styles[variant],
        styles[scale],
        className
      )}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option} per page
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
