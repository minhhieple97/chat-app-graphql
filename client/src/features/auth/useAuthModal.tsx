import { useState } from 'react';
import { useMutation, ApolloError } from '@apollo/client';
import { LOGIN_USER } from '@/graphql/mutations/Login';
import { REGISTER_USER } from '@/graphql/mutations/Register';
import { LoginResponse, User } from '@/gql/graphql';
import { useGeneralStore } from '@/stores/generalStore';
import { useUserStore } from '@/stores/userStore';
import { toast } from 'sonner';
import { AuthFormData, AuthMode } from './types';

interface ValidationError {
  extensions?: {
    [key: string]: string;
    code: string;
  };
}

export const useAuthModal = () => {
  const { toggleLoginModal } = useGeneralStore();
  const { setUser } = useUserStore();
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

  const handleAuthSuccess = (user: User) => {
    setUser(user);
    toggleLoginModal(false);
    setValidationErrors({});
  };

  const [login, { loading: isLoginLoading }] = useMutation<{ login: LoginResponse }>(LOGIN_USER, {
    onCompleted: (data) => {
      if (data.login.success) {
        handleAuthSuccess(data.login.user);
        toast.success('Logged in successfully');
      } else {
        toast.error(data.login.message || 'Login failed');
      }
    },
    onError: handleGraphQLError,
  });

  const [register, { loading: isRegisterLoading }] = useMutation<{ register: LoginResponse }>(
    REGISTER_USER,
    {
      onCompleted: (data) => {
        if (data.register.success) {
          handleAuthSuccess(data.register.user);
          toast.success('Registration successful');
        } else {
          toast.error(data.register.message || 'Registration failed');
        }
      },
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
