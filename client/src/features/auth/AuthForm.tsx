import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthFormData, AuthFormProps } from './type';

export const AuthForm = ({ mode, onSubmit, onModeChange }: AuthFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <Input
          placeholder="Full Name"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
      )}
      <Input
        placeholder="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {mode === 'register' && (
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}
      <Button type="submit" className="w-full">
        {mode === 'login' ? 'Login' : 'Register'}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <Button
          type="button"
          variant="link"
          className="p-0"
          onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Register' : 'Login'}
        </Button>
      </div>
    </form>
  );
};
