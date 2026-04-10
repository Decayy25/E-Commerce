import React from 'react';
import { Input } from '../atoms/Input';

interface FormFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
}

export const FormField: React.FC<FormFieldProps> = ({ icon, ...props }) => (
  <div className="relative w-full">
    <Input {...props} />
    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-red-600 text-xl pointer-events-none drop-shadow-sm">
      {icon}
    </span>
  </div>
);