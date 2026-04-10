import React, { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Login attempt: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <FormField 
        type="email" 
        placeholder="Email" 
        icon="✉" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <FormField 
        type="password" 
        placeholder="Password" 
        icon="🔒" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <div className="pt-4">
        <Button type="submit" className="w-full">Login</Button>
      </div>
    </form>
  );
};