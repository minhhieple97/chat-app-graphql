import { axiosClient } from '@/lib/api/axios-client';

export const authApi = {
  refreshToken: async () => {
    const response = await axiosClient.post<{ accessToken: string }>('/auth/refresh');
    return response.data;
  },
};
