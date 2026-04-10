import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';

export const RegisterForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '', email: '', phone: '', birthday: '', password: '', confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Icon = {
    profile: <i className="fas fa-user-circle profile-icon"></i>,
    email: <i className="fa-regular fa-envelope"></i>,
    phone: <i className="fa-solid fa-phone"></i>,
    calendar: <i className="fa-solid fa-calendar"></i>
  }

  return (
    <div className="w-full">
      {step === 1 ? (
        <div className="space-y-4">
          <FormField name="username" placeholder="Username" icon={Icon.profile} value={formData.username} onChange={handleChange} />
          <FormField name="email" type="email" placeholder="Email" icon={Icon.email} value={formData.email} onChange={handleChange} />
          <FormField name="phone" placeholder="Phone Number" icon={Icon.phone} value={formData.phone} onChange={handleChange} />
          
          <div className="flex items-center gap-2">
            <label className="text-[#6ba4d9] font-semibold">Birthday</label>
            <FormField name="birthday" type="date" placeholder="dd/mm/yyyy" icon={Icon.calendar} value={formData.birthday} onChange={handleChange} />
          </div>

          <div className="flex flex-col items-start mt-2">
            <div className="text-[11px] text-blue-500">
              Do you not have account? 
              <Button variant="link">
                <Link to={"/login"} className='p-2'>Login</Link>
              </Button>
              
            </div>
            <div className="w-full flex justify-end mt-4">
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <FormField name="password" type="password" placeholder="Password" icon="👁" value={formData.password} onChange={handleChange} />
          <FormField name="confirmPassword" type="password" placeholder="Confirm Password" icon="👁" value={formData.confirmPassword} onChange={handleChange} />
          
          <div className="pt-10">
            <Button className="w-full" onClick={() => alert("Registered!")}>Register</Button>
          </div>
          <button onClick={() => setStep(1)} className="text-xs text-gray-400 mt-2">← Back</button>
        </div>
      )}
    </div>
  );
};