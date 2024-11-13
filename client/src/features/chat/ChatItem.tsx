import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatItemProps {
  name: string;
  lastMessage: string;
  timestamp: string;
  avatarUrl?: string;
}

export const ChatItem = ({ name, lastMessage, timestamp, avatarUrl }: ChatItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer">
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{name}</h3>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
      </div>
    </div>
  );
};
