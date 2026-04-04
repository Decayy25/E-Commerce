import { useState, useEffect } from 'react';
import error from 'console';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({email: '',password: ''});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/auth/login`, {
      method: 'POST',
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => localStorage.setItem("token", data.token))
    .catch(err => error.log(err))
    .finally(() => setIsLoading(false));
  }, []);



  return (
    // atomic design
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      
    </div>
  );
};

export default LoginPage;