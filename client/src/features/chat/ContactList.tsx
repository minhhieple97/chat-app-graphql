import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatItem } from '@/features/chat/ChatItem';
import { useContact } from './hooks/useContact';
import { Skeleton } from '@/components/ui/skeleton';

export const ContactList = () => {
  const { chatrooms, loading, formatTimestamp } = useContact();

  if (loading) {
    return (
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-2 space-y-2">
        {chatrooms.map((chatroom) => (
          <ChatItem key={chatroom.id} name={chatroom.name || ''} />
        ))}
      </div>
    </ScrollArea>
  );
};
