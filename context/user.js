import { auth } from "@/utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
const UserCtx = createContext({
  user: null,
  loading: true,
  logOut: () => {},
  login: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    setUser(user);
  });
  const login = useCallback((user) => {
    setUser(user);
  }, []);
  const logOut = useCallback(async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  }, []);
  return (
    <UserCtx.Provider
      value={{
        user,
        loading,
        logOut,
        login,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};
export const useAuth = () => useContext(UserCtx);
export default UserProvider;
