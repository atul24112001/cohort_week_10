import { atom } from "recoil";
import keys from "../keys";

const authenticationState = atom({
  key: keys.AUTHENTICATION_STATE,
  default: {
    isAuthenticated: false,
    user: null,
  },
});

export default authenticationState;
