import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GeneralState {
  isProfileSettingsModalOpen: boolean;
  isLoginModalOpen: boolean;
  isCreateRoomModalOpen: boolean;
  toggleProfileSettingsModal: () => void;
  toggleLoginModal: (isLoginModalOpen: boolean) => void;
  toggleCreateRoomModal: () => void;
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set) => ({
      isProfileSettingsModalOpen: false,
      isLoginModalOpen: false,
      isCreateRoomModalOpen: false,

      toggleProfileSettingsModal: () =>
        set((state) => ({
          isProfileSettingsModalOpen: !state.isProfileSettingsModalOpen,
        })),
      toggleLoginModal: (isLoginModalOpen: boolean) => {
        console.log('toggleLoginModal');
        set(() => ({
          isLoginModalOpen,
        }));
      },
      toggleCreateRoomModal: () =>
        set((state) => ({
          isCreateRoomModalOpen: !state.isCreateRoomModalOpen,
        })),
    }),
    {
      name: 'general-store',
    },
  ),
);
