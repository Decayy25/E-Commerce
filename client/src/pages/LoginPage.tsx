import React from 'react';
import { Link } from "react-router-dom";
import { LoginForm } from '../components/templates/LoginForm';
import { Button } from '../components/atoms/Button';
import logo from "../assets/Logo.png"

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e5e7eb]">
      <div className="bg-white p-10 rounded-xl border border-gray-300 shadow-xl w-full max-w-[400px] flex flex-col items-center">
        
        {/* Logo Placeholder */}
        <div className="mb-12">
           <div className="w-46 h-46 flex items-center justify-center">
              <img src={logo} />
           </div>
        </div>

        <LoginForm />

        <div className="mt-6 flex gap-1 items-center">
          <span className="text-var(--Intel--) text-xs">Do you not have account?</span>
          <Button variant="link">
            <Link to={"/register"}>Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;