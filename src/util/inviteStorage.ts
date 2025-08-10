export const INVITE_ID_STORAGE_KEY = 'wedding-invite-id';

export const getStoredInviteId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(INVITE_ID_STORAGE_KEY);
};

export const setStoredInviteId = (inviteId: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(INVITE_ID_STORAGE_KEY, inviteId);
};

export const clearStoredInviteId = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(INVITE_ID_STORAGE_KEY);
};
