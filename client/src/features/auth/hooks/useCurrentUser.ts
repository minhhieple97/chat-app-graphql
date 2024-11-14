import { useLazyQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { useUserStore } from '@/stores/userStore';
import { CurrentUserResponse } from '@/gql/graphql';

export const useCurrentUser = () => {
  const { setUser } = useUserStore();

  const [getCurrentUser] = useLazyQuery<{ getCurrentUser: CurrentUserResponse }>(GET_CURRENT_USER);

  const refetchUser = async () => {
    try {
      const { data } = await getCurrentUser();
      if (data?.getCurrentUser.success) {
        setUser(data.getCurrentUser.user);
      }
      return data;
    } catch (error) {
      console.error('Error refetching user:', error);
      throw error;
    }
  };

  return { refetchUser };
};
