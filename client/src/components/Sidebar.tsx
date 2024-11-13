import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatItem } from '@/features/chat/ChatItem';

export const Sidebar = () => {
  return (
    <div className="w-80 border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Chats</h2>
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
