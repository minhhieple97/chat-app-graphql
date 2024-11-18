import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatItemProps {
  name: string;
  avatarUrl?: string;
}

export const ChatItem = ({ name, avatarUrl }: ChatItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer">
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{name}</h3>
        </div>
      </div>
    </div>
  );
};
