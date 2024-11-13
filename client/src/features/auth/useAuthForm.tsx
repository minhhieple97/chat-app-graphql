import { useState } from 'react';
import { AuthFormData } from './types';

export const useAuthForm = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return {
    formData,
    handleChange,
    resetForm,
  };
};
