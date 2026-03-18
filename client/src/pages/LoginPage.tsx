import React, { useState, FormEvent } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login successful:', formData);
      alert('Login berhasil! 🎉');
      
      setFormData({ email: '', password: '' });
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ email: '', password: 'Login gagal, coba lagi' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-intel via-soft-cyan to-aquamarine relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-float" />
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/15 border border-white/20 rounded-3xl p-8 shadow-2xl animate-slide-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="bg-gradient-to-r from-intel via-nvidia to-radeon bg-clip-text text-transparent text-4xl md:text-5xl font-black mb-2 tracking-tight">
              TechHub
            </h1>
            <p className="text-icy-aqua text-lg opacity-90 font-medium">
              Masuk ke Dashboard Anda
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-mist group-focus-within:text-intel transition-colors duration-300">
                👤
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email atau Username"
                className={`
                  w-full pl-12 pr-4 py-5 bg-white/90 backdrop-blur-md rounded-2xl text-lg border-2 border-transparent
                  focus:outline-none focus:border-intel focus:ring-4 ring-intel/10
                  focus:bg-white focus:-translate-y-0.5 transition-all duration-300
                  ${errors.email ? 'border-red-400 ring-red-400/20' : 'hover:border-white/50'}
                `}
                required
              />
              {errors.email && (
                <p className="mt-1 ml-12 text-sm text-red-400 animate-pulse">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-mist group-focus-within:text-intel transition-colors duration-300">
                🔒
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={`
                  w-full pl-12 pr-4 py-5 bg-white/90 backdrop-blur-md rounded-2xl text-lg border-2 border-transparent
                  focus:outline-none focus:border-intel focus:ring-4 ring-intel/10
                  focus:bg-white focus:-translate-y-0.5 transition-all duration-300
                  ${errors.password ? 'border-red-400 ring-red-400/20' : 'hover:border-white/50'}
                `}
                required
              />
              {errors.password && (
                <p className="mt-1 ml-12 text-sm text-red-400 animate-pulse">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-6 px-8 bg-gradient-to-r from-intel to-nvidia text-white
                rounded-2xl text-lg font-semibold uppercase tracking-wider
                relative overflow-hidden shadow-xl hover:shadow-2xl
                transform hover:-translate-y-1 active:translate-y-0
                transition-all duration-300 disabled:pointer-events-none
                ${isLoading ? 'animate-pulse' : ''}
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Memproses...
                </div>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-icy-aqua to-transparent" />
            </div>
            <div className="relative flex justify-center text-center">
              <span className="bg-white/90 px-6 py-2 text-blue-slate text-sm font-medium">
                atau masuk dengan
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <a
              href="#"
              className="group p-4 border-2 border-white/20 bg-white/10 backdrop-blur-md rounded-2xl 
                       text-center font-semibold transition-all duration-300 hover:bg-white/20 
                       hover:-translate-y-1 hover:border-white/40 hover:shadow-lg"
            >
              <div className="text-red-500 text-xl mb-1 group-hover:scale-110 transition-transform">🇬🇧</div>
              Google
            </a>
            <a
              href="#"
              className="group p-4 border-2 border-white/20 bg-white/10 backdrop-blur-md rounded-2xl 
                       text-center font-semibold transition-all duration-300 hover:bg-white/20 
                       hover:-translate-y-1 hover:border-white/40 hover:shadow-lg"
            >
              <div className="text-black text-xl mb-1 group-hover:scale-110 transition-transform">🍎</div>
              Apple
            </a>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <a
              href="#"
              className="inline-block text-icy-aqua hover:text-intel font-medium text-sm 
                       transition-colors duration-300 hover:underline"
            >
              Lupa Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;