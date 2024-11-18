import { useQuery } from '@apollo/client';
import { GET_CHATROOMS_FOR_USER } from '@/graphql/queries/GetChatroomsForUser';
import { useUserStore } from '@/stores/userStore';
import { Chatroom } from '@/gql/graphql';

export const useContact = () => {
  const { id: userId } = useUserStore();

  const { data, loading } = useQuery<{ getChatroomsForUser: Chatroom[] }>(GET_CHATROOMS_FOR_USER, {
    variables: { userId },
    skip: !userId,
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return {
    chatrooms: data?.getChatroomsForUser || [],
    loading,
    formatTimestamp,
  };
};
