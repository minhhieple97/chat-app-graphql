import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { useUserStore } from '@/stores/userStore';
import { CurrentUserResponse } from '@/gql/graphql';
const INTERVAL_TIME = 30000;
export const useAuthCheck = () => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const { resetUser } = useUserStore();

  const { refetch } = useQuery<{ getCurrentUser: CurrentUserResponse }>(GET_CURRENT_USER, {
    fetchPolicy: 'no-cache',
    onError: () => {
      resetUser();
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await refetch();
        console.log({ data });
        if (!data?.getCurrentUser.success) {
          resetUser();
        }
      } catch {
        resetUser();
      }
    };

    // Initial check
    checkAuth();

    // Set up interval
    intervalRef.current = setInterval(checkAuth, INTERVAL_TIME); // 30 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refetch, resetUser]);
};
