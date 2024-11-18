import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useGeneralStore } from '@/stores/generalStore';
import { Sidebar } from './Sidebar';
import { AuthModal } from '@/features/auth/components/AuthModal';
import { Button } from './ui/button';
import { useAuthCheck } from '@/features/auth/hooks/useAuthCheck';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthCheck();

  const { id } = useUserStore();
  const { toggleLoginModal } = useGeneralStore();
  useEffect(() => {
    if (!id) toggleLoginModal(true);
    else toggleLoginModal(false);
  }, [id, toggleLoginModal]);

  const handleAuthClick = () => {
    toggleLoginModal(true);
  };

  return (
    <div className="h-screen w-screen flex">
      {id ? (
        <>
          <Sidebar />
          <main className="flex-1">{children}</main>
        </>
      ) : (
        <div className="flex-1 grid place-items-center bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-md w-full px-4">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Welcome to Chat App</h1>
                <p className="text-muted-foreground">Connect with friends and family instantly</p>
              </div>

              <div className="flex flex-col gap-4">
                <Button size="lg" className="w-full" onClick={handleAuthClick}>
                  Login to Your Account
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                <Button variant="outline" size="lg" className="w-full" onClick={handleAuthClick}>
                  Create New Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <AuthModal />
    </div>
  );
};
