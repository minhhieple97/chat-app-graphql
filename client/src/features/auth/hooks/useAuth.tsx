import { useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/graphql/mutations/Login';
import { REGISTER_USER } from '@/graphql/mutations/Register';
import { LoginResponse } from '@/gql/graphql';
import { useGeneralStore } from '@/stores/generalStore';
import { toast } from 'sonner';
import { AuthFormData, AuthMode } from '../types';
import { useCurrentUser } from './useCurrentUser';
import { userApi } from '../api/user-api';

interface ValidationError {
  extensions?: {
    [key: string]: string;
    code: string;
  };
}

type AuthState = {
  mode: AuthMode;
  isLoading: boolean;
  isUploadingAvatar: boolean;
  validationErrors: Record<string, string>;
  formData: AuthFormData;
};

export const useAuth = () => {
  const { toggleLoginModal } = useGeneralStore();
  const { getCurrentUser } = useCurrentUser();

  // Combined state
  const [state, setState] = useState<AuthState>({
    mode: 'login',
    isLoading: false,
    isUploadingAvatar: false,
    validationErrors: {},
    formData: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: null,
    },
  });

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [e.target.name]: e.target.value },
    }));
  };

  const handleAvatarChange = (file: File | null) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, avatar: file },
    }));
  };

  const setMode = (mode: AuthMode) => {
    setState((prev) => ({ ...prev, mode }));
  };

  const resetForm = () => {
    setState((prev) => ({
      ...prev,
      formData: {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: null,
      },
      validationErrors: {},
    }));
  };

  // Error handling
  const handleValidationError = (error: ApolloError) => {
    const firstError = error.graphQLErrors[0] as ValidationError;
    if (firstError?.extensions?.code === 'VALIDATION_ERROR') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { code, stacktrace, ...validationFields } = firstError.extensions;
      setState((prev) => ({ ...prev, validationErrors: validationFields }));

      if (validationFields.invalidCredentials) {
        toast.error(validationFields.invalidCredentials);
        return;
      }

      const firstValidationMessage = Object.values(validationFields)[0];
      if (firstValidationMessage) {
        toast.error(firstValidationMessage);
      }
    } else {
      toast.error(error.message);
    }
  };

  // Avatar upload
  const uploadAvatar = async () => {
    if (!state.formData.avatar) return;

    setState((prev) => ({ ...prev, isUploadingAvatar: true }));
    try {
      await userApi.uploadAvatar(state.formData.avatar);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      throw error;
    } finally {
      setState((prev) => ({ ...prev, isUploadingAvatar: false }));
    }
  };

  // Auth success handler
  const handleAuthSuccess = async (data: LoginResponse) => {
    if (!data.success) {
      toast.error(data.message || `${state.mode === 'login' ? 'Login' : 'Registration'} failed`);
      return;
    }

    try {
      if (state.mode === 'register' && state.formData.avatar) {
        await uploadAvatar();
      }
      await getCurrentUser();
      toggleLoginModal(false);
      setState((prev) => ({ ...prev, validationErrors: {} }));
      resetForm();
      toast.success(state.mode === 'login' ? 'Logged in successfully' : 'Registration successful');
    } catch (error) {
      console.error('Error after auth:', error);
      toast.error('Authentication successful but failed to complete setup');
    }
  };

  // Mutations
  const [login, { loading: isLoginLoading }] = useMutation<{ login: LoginResponse }>(LOGIN_USER, {
    onCompleted: (data) => handleAuthSuccess(data.login),
    onError: handleValidationError,
  });

  const [register, { loading: isRegisterLoading }] = useMutation<{ register: LoginResponse }>(
    REGISTER_USER,
    {
      onCompleted: (data) => handleAuthSuccess(data.register),
      onError: handleValidationError,
    },
  );

  // Submit handler
  const handleSubmit = async () => {
    setState((prev) => ({ ...prev, validationErrors: {} }));

    if (state.mode === 'login') {
      await login({
        variables: {
          email: state.formData.email,
          password: state.formData.password,
        },
      });
    } else {
      if (state.formData.password !== state.formData.confirmPassword) {
        setState((prev) => ({
          ...prev,
          validationErrors: { confirmPassword: 'Passwords do not match' },
        }));
        toast.error('Passwords do not match');
        return;
      }
      await register({
        variables: {
          fullname: state.formData.fullname!,
          email: state.formData.email,
          password: state.formData.password,
        },
      });
    }
  };

  return {
    mode: state.mode,
    formData: state.formData,
    validationErrors: state.validationErrors,
    isLoading: isLoginLoading || isRegisterLoading,
    isUploadingAvatar: state.isUploadingAvatar,
    setMode,
    handleChange,
    handleAvatarChange,
    handleSubmit,
    resetForm,
  };
};
