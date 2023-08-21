import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "./recoil/selectors/authentication-selector";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/auth-page";

function App() {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  return isAuthenticated ? <HomePage /> : <AuthPage />;
}

export default App;
