import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Plus } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { useUserStore } from '@/stores/userStore';
import { LOGOUT_USER } from '@/graphql/mutations/Logout';
import { toast } from 'sonner';
import { useGeneralStore } from '@/stores/generalStore';
import { CreateChatroomModal } from '@/features/chat/CreateChatroomModal';
import { ContactList } from '@/features/chat/ContactList';

export const Sidebar = () => {
  const { fullname, avatarUrl, resetUser } = useUserStore();
  const { toggleCreateRoomModal } = useGeneralStore();
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleCreateRoomModal} title="Create Room">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ContactList />
      <CreateChatroomModal />
    </div>
  );
};
