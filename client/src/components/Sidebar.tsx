import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { useUserStore } from '@/stores/userStore';
import { LOGOUT_USER } from '@/graphql/mutations/Logout';
import { ChatItem } from '@/features/chat/ChatItem';
import { toast } from 'sonner';

export const Sidebar = () => {
  const { fullname, avatarUrl, resetUser } = useUserStore();
  const [logout] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      resetUser();
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="w-80 border-r h-screen flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={fullname} />
            ) : (
              <AvatarFallback>
                {fullname
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-1">
            <h2 className="font-semibold">Chats</h2>
            <p className="text-sm text-muted-foreground">{fullname}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          <ChatItem name="John Doe" lastMessage="Hello there!" timestamp="2:30 PM" />
          {/* Add more ChatItems as needed */}
        </div>
      </ScrollArea>
    </div>
  );
};
