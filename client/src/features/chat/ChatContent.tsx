import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

export const ChatContent = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="border-b p-4">
        <h2 className="font-semibold">John Doe</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">{/* Messages will go here */}</div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input placeholder="Type a message..." />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
