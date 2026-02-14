import { Checkbox as HeroUICheckbox } from '@heroui/react';
import React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
  label?: string;
  isIndeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  disabled = false,
  size = 'md',
  color = 'primary',
  label,
  isIndeterminate,
  onChange,
}) => {
  return (
    <HeroUICheckbox
      isSelected={checked}
      isIndeterminate={isIndeterminate}
      isDisabled={disabled}
      size={size}
      color={color}
      onValueChange={onChange}
    >
      {label}
    </HeroUICheckbox>
  );
};

export default Checkbox;
