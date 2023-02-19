import { LocalStorageService } from 'services';
import { ProfileUser } from 'store/slices/auth/type';

export const useProfile = () => {
  const userInfo: ProfileUser | undefined = LocalStorageService.get(
    LocalStorageService.PROFILE_SERVICE,
  );
  return userInfo;
};
