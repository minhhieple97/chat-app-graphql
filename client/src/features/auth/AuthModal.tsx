import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AuthForm } from './AuthForm';
import { AuthMode, AuthFormData } from './type';
import { useGeneralStore } from '@/stores/generalStore';

export const AuthModal = () => {
  const { isLoginModalOpen, toggleLoginModal } = useGeneralStore();
  const [mode, setMode] = useState<AuthMode>('login');

  const handleSubmit = (data: AuthFormData) => {
    console.log('Form submitted:', data);
    // Handle login/register logic here
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={(open) => toggleLoginModal(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? 'Login to Chat App' : 'Create an account'}</DialogTitle>
        </DialogHeader>
        <AuthForm mode={mode} onSubmit={handleSubmit} onModeChange={setMode} />
      </DialogContent>
    </Dialog>
  );
};
