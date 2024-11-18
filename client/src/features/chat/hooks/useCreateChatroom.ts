import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CHATROOM } from '@/graphql/mutations/CreateChatroom';
import { SEARCH_USERS } from '@/graphql/queries/SearchUsers';
import { ADD_USERS_TO_CHATROOM } from '@/graphql/mutations/AddUsersToChatroom';
import { useGeneralStore } from '@/stores/generalStore';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'sonner';
import { GET_CHATROOMS_FOR_USER } from '@/graphql/queries/GetChatroomsForUser';
import { useUserStore } from '@/stores/userStore';

export const useCreateChatroom = () => {
  const { toggleCreateRoomModal } = useGeneralStore();
  const { id: userId } = useUserStore();
  const [roomName, setRoomName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_USERS, {
    variables: { searchTerm: debouncedSearch },
    skip: !debouncedSearch,
  });

  const [createChatroom, { loading: createLoading }] = useMutation(CREATE_CHATROOM, {
    onCompleted: async (data) => {
      if (selectedUsers.length > 0) {
        await addUsersToChatroom({
          variables: {
            chatroomId: Number(data.createChatroom.id),
            userIds: selectedUsers,
          },
        });
      }
      toast.success('Chatroom created successfully');
      handleReset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [
      {
        query: GET_CHATROOMS_FOR_USER,
        variables: { userId },
      },
    ],
  });

  const [addUsersToChatroom] = useMutation(ADD_USERS_TO_CHATROOM);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      toast.error('Please enter a room name');
      return;
    }
    await createChatroom({ variables: { name: roomName } });
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    );
  };

  const handleReset = () => {
    setRoomName('');
    setSearchTerm('');
    setSelectedUsers([]);
    toggleCreateRoomModal();
  };

  return {
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
    handleReset,
  };
};
