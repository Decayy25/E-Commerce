// RegisterPage.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  termsAccepted: boolean;
}

interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  termsAccepted?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  function validateForm(): RegisterFormErrors {
    const newErrors: RegisterFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nama depan wajib diisi';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nama belakang wajib diisi';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Konfirmasi password tidak cocok';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Anda harus menyetujui syarat dan ketentuan';
    }

    return newErrors;
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof RegisterFormData]: type === 'checkbox' ? checked : value,
    }));
    
    const errorKey = name as keyof RegisterFormErrors;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: undefined
      }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        termsAccepted: false,
      });
      
      setIsSuccess(true);
    } catch (error) {
      setErrors({ email: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
  }

  function PasswordStrength({ password }: { password: string }): JSX.Element {
    function getStrength(pwd: string): number {
      let strength = 0;
      if (pwd.length >= 8) strength++;
      if (/[a-z]/.test(pwd)) strength++;
      if (/[A-Z]/.test(pwd)) strength++;
      if (/[0-9]/.test(pwd)) strength++;
      if (/[^A-Za-z0-9]/.test(pwd)) strength++;
      return strength;
    }

    const strength = getStrength(password);
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    return (
      <div className="mt-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Password Strength</span>
          <span className={`text-xs font-medium ${
            strength <= 1 ? 'text-red-600' :
            strength <= 2 ? 'text-yellow-600' :
            strength <= 3 ? 'text-blue-600' : 'text-green-600'
          }`}>
            {levels[strength] || 'Strong'}
          </span>
        </div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                strength > i ? 
                'bg-green-500' : 
                strength > i - 1 ? 
                'bg-yellow-400' : 
                'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h1>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-green-700 mb-8 text-lg">Akun Anda telah berhasil dibuat. Silakan cek email untuk verifikasi.</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Daftar Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 0l-6.849 6.849m0 0l-6.849-6.849M12 12v7m0 0v-7m0-7h.01" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun Baru</h1>
          <p className="text-gray-600">Daftar untuk memulai perjalanan Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Depan
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm ${
                  errors.firstName ? 'border-red-300 bg-red-50' : 'hover:border-gray-400'
                }`}
                placeholder="John"
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Belakang
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm ${
                  errors.lastName ? 'border-red-300 bg-red-50' : 'hover:border-gray-400'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm ${
                  errors.email ? 'border-red-300 bg-red-50' : 'hover:border-gray-400'
                }`}
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                No. Telepon (Opsional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400"
                placeholder="081234567890"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm pr-12 ${
                  errors.password ? 'border-red-300 bg-red-50' : 'hover:border-gray-400'
                }`}
                placeholder="Minimal 8 karakter"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              {formData.password && <PasswordStrength password={formData.password} />}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm pr-12 ${
                  errors.confirmPassword ? 'border-red-300 bg-red-50' : 'hover:border-gray-400'
                }`}
                placeholder="Ulangi password"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded focus:ring-2"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-900">
                Saya setuju dengan{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">Syarat & Ketentuan</a>{' '}
                dan{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">Kebijakan Privasi</a>
              </label>
            </div>
            {errors.termsAccepted && <p className="mt-1 text-sm text-red-600 ml-8">{errors.termsAccepted}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isLoading ? 'animate-pulse' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mendaftar...
              </>
            ) : (
              'Daftar Sekarang'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Masuk sekarang
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}