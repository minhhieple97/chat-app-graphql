import { useState } from 'react';
import { useMutation, ApolloError } from '@apollo/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AuthForm } from './AuthForm';
import { AuthMode, AuthFormData } from './types';
import { useGeneralStore } from '@/stores/generalStore';
import { useUserStore } from '@/stores/userStore';
import { LOGIN_USER } from '@/graphql/mutations/Login';
import { REGISTER_USER } from '@/graphql/mutations/Register';
import { LoginResponse, User } from '@/gql/graphql';
import { toast } from 'sonner';

interface ValidationError {
  extensions?: {
    [key: string]: string;
    code: string;
  };
}

export const AuthModal = () => {
  const { isLoginModalOpen, toggleLoginModal } = useGeneralStore();
  const { setUser } = useUserStore();
  const [mode, setMode] = useState<AuthMode>('login');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleGraphQLError = (error: ApolloError) => {
    const firstError = error.graphQLErrors[0] as ValidationError;

    if (firstError?.extensions?.code === 'VALIDATION_ERROR') {
      const { code, stacktrace, ...validationFields } = firstError.extensions;
      setValidationErrors(validationFields);

      // Show the first validation error as a toast
      const firstValidationMessage = Object.values(validationFields)[0];
      if (firstValidationMessage) {
        toast.error(firstValidationMessage);
      }
    } else {
      toast.error(error.message);
    }
  };

  const [login, { loading: isLoginLoading }] = useMutation<{ login: LoginResponse }>(LOGIN_USER, {
    onCompleted: (data) => {
      if (data.login.success) {
        handleAuthSuccess(data.login.user);
        toast.success('Logged in successfully');
        setValidationErrors({});
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
          setValidationErrors({});
        } else {
          toast.error(data.register.message || 'Registration failed');
        }
      },
      onError: handleGraphQLError,
    },
  );

  const handleAuthSuccess = (user: User) => {
    setUser(user);
    toggleLoginModal(false);
  };

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

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={(open) => toggleLoginModal(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? 'Login to Chat App' : 'Create an account'}</DialogTitle>
        </DialogHeader>
        <AuthForm
          mode={mode}
          onSubmit={handleSubmit}
          onModeChange={setMode}
          isLoading={isLoginLoading || isRegisterLoading}
          errors={validationErrors}
        />
      </DialogContent>
    </Dialog>
  );
};
