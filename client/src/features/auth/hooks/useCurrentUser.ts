import { useLazyQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { useUserStore } from '@/stores/userStore';
import { CurrentUserResponse } from '@/gql/graphql';
import { useGeneralStore } from '@/stores/generalStore';

export const useCurrentUser = () => {
  const { setUser } = useUserStore();
  const { toggleLoginModal } = useGeneralStore();

  const [getCurrentUser] = useLazyQuery<{ getCurrentUser: CurrentUserResponse }>(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: (response) => {
      const data = response.getCurrentUser;
      if (data.success) {
        setUser(data.user);
        toggleLoginModal(false);
      }
    },
  });

  return { getCurrentUser };
};
