import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGeneralStore } from '@/stores/generalStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Search, UserPlus } from 'lucide-react';
import { User } from '@/gql/graphql';
import { useCreateChatroom } from './hooks/useCreateChatroom';

export const CreateChatroomModal = () => {
  const { isCreateRoomModalOpen, toggleCreateRoomModal } = useGeneralStore();
  const {
    roomName,
    setRoomName,
    searchTerm,
    setSearchTerm,
    selectedUsers,
    searchData,
    searchLoading,
    createLoading,
    handleCreateRoom,
    toggleUserSelection,
  } = useCreateChatroom();

  return (
    <Dialog open={isCreateRoomModalOpen} onOpenChange={toggleCreateRoomModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Chat Room</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users to add..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[200px] rounded-md border p-2">
              {searchLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="space-y-2">
                  {searchData?.searchUsers.users.map((user: User) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer"
                      onClick={() => toggleUserSelection(Number(user.id))}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar>
                          {user.avatarUrl ? (
                            <AvatarImage src={user.avatarUrl} />
                          ) : (
                            <AvatarFallback>
                              {user.fullname
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.fullname}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      {selectedUsers.includes(Number(user.id)) && (
                        <UserPlus className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          <Button
            className="w-full"
            onClick={handleCreateRoom}
            disabled={createLoading || !roomName.trim()}
          >
            {createLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Chat Room'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
