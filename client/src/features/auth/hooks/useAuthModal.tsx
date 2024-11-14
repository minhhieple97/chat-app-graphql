import { useState } from 'react';
import { useMutation, ApolloError } from '@apollo/client';
import { LOGIN_USER } from '@/graphql/mutations/Login';
import { REGISTER_USER } from '@/graphql/mutations/Register';
import { LoginResponse } from '@/gql/graphql';
import { useGeneralStore } from '@/stores/generalStore';
import { toast } from 'sonner';
import { AuthFormData, AuthMode } from '../types';
import { useCurrentUser } from './useCurrentUser';

interface ValidationError {
  extensions?: {
    [key: string]: string;
    code: string;
  };
}

export const useAuthModal = () => {
  const { toggleLoginModal } = useGeneralStore();
  const { refetchUser } = useCurrentUser();
  const [mode, setMode] = useState<AuthMode>('login');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleGraphQLError = (error: ApolloError) => {
    const firstError = error.graphQLErrors[0] as ValidationError;
    if (firstError?.extensions?.code === 'VALIDATION_ERROR') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { code, stacktrace, ...validationFields } = firstError.extensions;
      setValidationErrors(validationFields);

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

  const handleAuthSuccess = async (data: LoginResponse) => {
    if (data.success) {
      try {
        await refetchUser();
        toggleLoginModal(false);
        setValidationErrors({});
        toast.success(mode === 'login' ? 'Logged in successfully' : 'Registration successful');
      } catch (error) {
        console.error('Error refetching user after auth:', error);
        toast.error('Authentication successful but failed to load user data');
      }
    } else {
      toast.error(data.message || `${mode === 'login' ? 'Login' : 'Registration'} failed`);
    }
  };

  const [login, { loading: isLoginLoading }] = useMutation<{ login: LoginResponse }>(LOGIN_USER, {
    onCompleted: (data) => handleAuthSuccess(data.login),
    onError: handleGraphQLError,
  });

  const [register, { loading: isRegisterLoading }] = useMutation<{ register: LoginResponse }>(
    REGISTER_USER,
    {
      onCompleted: (data) => handleAuthSuccess(data.register),
      onError: handleGraphQLError,
    },
  );

  const handleSubmit = async (data: AuthFormData) => {
    setValidationErrors({});

    if (mode === 'login') {
      await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
    } else {
      if (data.password !== data.confirmPassword) {
        setValidationErrors({ confirmPassword: 'Passwords do not match' });
        toast.error('Passwords do not match');
        return;
      }
      await register({
        variables: {
          fullname: data.fullname!,
          email: data.email,
          password: data.password,
        },
      });
    }
  };

  return {
    mode,
    setMode,
    validationErrors,
    isLoading: isLoginLoading || isRegisterLoading,
    handleSubmit,
  };
};
