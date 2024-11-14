import { useState } from 'react';
import { AuthFormData } from '../types';
import { userApi } from '../api/user-api';

export const useAuthForm = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: null,
  });
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, avatar: file }));
  };

  const uploadAvatarIfExists = async () => {
    if (formData.avatar) {
      try {
        setIsUploadingAvatar(true);
        await userApi.uploadAvatar(formData.avatar);
      } catch (error) {
        console.error('Failed to upload avatar:', error);
        throw error;
      } finally {
        setIsUploadingAvatar(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: null,
    });
  };

  return {
    formData,
    handleChange,
    handleAvatarChange,
    resetForm,
    uploadAvatarIfExists,
    isUploadingAvatar,
  };
};
