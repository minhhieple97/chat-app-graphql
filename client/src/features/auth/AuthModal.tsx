import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AuthForm } from './AuthForm';
import { useGeneralStore } from '@/stores/generalStore';
import { useAuthModal } from './useAuthModal';

export const AuthModal = () => {
  const { isLoginModalOpen, toggleLoginModal } = useGeneralStore();
  const { mode, setMode, validationErrors, isLoading, handleSubmit } = useAuthModal();

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
          isLoading={isLoading}
          errors={validationErrors}
        />
      </DialogContent>
    </Dialog>
  );
};
