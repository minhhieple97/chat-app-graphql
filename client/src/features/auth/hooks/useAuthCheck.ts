import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { useUserStore } from '@/stores/userStore';
import { CurrentUserResponse } from '@/gql/graphql';
const INTERVAL_TIME = 30000;
export const useAuthCheck = () => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const { resetUser, setUser } = useUserStore();

  const { refetch } = useQuery<{ getCurrentUser: CurrentUserResponse }>(GET_CURRENT_USER, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onError: () => {
      resetUser();
    },
    onCompleted: (response) => {
      const data = response.getCurrentUser;
      if (!data.success) {
        resetUser();
      }
      setUser(data.user);
    },
  });

  useEffect(() => {
    intervalRef.current = setInterval(refetch, INTERVAL_TIME); // 30 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refetch]);
};
