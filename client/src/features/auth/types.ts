export type AuthMode = 'login' | 'register';

export interface AuthFormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File | null;
}

export interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: AuthFormData) => void;
  onModeChange: (mode: AuthMode) => void;
  isLoading: boolean;
  errors: Record<string, string>;
}

export interface AuthFormErrors {
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  avatar?: string;
}
