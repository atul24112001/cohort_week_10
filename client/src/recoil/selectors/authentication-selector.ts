import { selector } from "recoil";
import authenticationState from "../atoms/authentication-atom";
import keys from "../keys";

export const isAuthenticatedState = selector({
  key: keys.IS_AUTHENTICATION_SELECTOR,
  get: ({ get }) => {
    const isAuthenticated = get(authenticationState).isAuthenticated;
    return isAuthenticated;
  },
});

export const userState = selector({
  key: keys.USER_SELECTOR,
  get: ({ get }) => {
    const user = get(authenticationState).user;
    return user;
  },
});
