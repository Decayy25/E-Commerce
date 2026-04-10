import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ ...props }) => (
  <input
    {...props}
    className="w-full py-3 px-5 rounded-full bg-[#6ba4d9] text-white placeholder-blue-100 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all focus:ring-2 focus:ring-blue-400"
  />
);