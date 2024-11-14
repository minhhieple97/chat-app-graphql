import { useLazyQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { useUserStore } from '@/stores/userStore';
import { CurrentUserResponse } from '@/gql/graphql';

export const useCurrentUser = () => {
  const { setUser } = useUserStore();

  const [getCurrentUser] = useLazyQuery<{ getCurrentUser: CurrentUserResponse }>(GET_CURRENT_USER, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (response) => {
      const data = response.getCurrentUser;
      if (data.success) {
        setUser(data.user);
      }
    },
  });

  return { getCurrentUser };
};
