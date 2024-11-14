export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type UploadAvatarResponse = {
  avatarUrl: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};
