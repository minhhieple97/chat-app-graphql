import { useQuery } from '@apollo/client';
import { GET_CHATROOMS_FOR_USER } from '@/graphql/queries/GetChatroomsForUser';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

export const useChatrooms = () => {
  const { id: userId } = useUserStore();
  const navigate = useNavigate();

  const { data: chatroomsData, loading: chatroomsLoading } = useQuery(GET_CHATROOMS_FOR_USER, {
    variables: { userId },
    skip: !userId,
  });

  const handleChatroomSelect = (chatroomId: number) => {
    navigate(`/?chatroomId=${chatroomId}`);
  };

  return {
    chatrooms: chatroomsData?.getChatroomsForUser || [],
    chatroomsLoading,
    messagesLoading: true,
    handleChatroomSelect,
  };
};
