import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthFormProps } from '../types';
import { useAuthForm } from '../hooks/useAuthForm';

export const AuthForm = ({ mode, onSubmit, onModeChange, isLoading, errors }: AuthFormProps) => {
  const { formData, handleChange } = useAuthForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <div className="space-y-2">
          <Input
            placeholder="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          {errors.fullname && <p className="text-sm text-destructive">{errors.fullname}</p>}
        </div>
      )}
      <div className="space-y-2">
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>
      {mode === 'register' && (
        <div className="space-y-2">
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
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