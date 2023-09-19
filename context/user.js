import { auth } from "@/utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
const UserCtx = createContext({
  user: null,
  loading: true,
  logOut: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const listener = onAuthStateChanged(auth, async (user) => {
  //     try {
  //       if (user !== null) {
  //         setUser(user);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (error) {
  //     } finally {
  //       setLoading(false);
  //     }
  //   });
  //   return () => listener();
  // }, []);
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };
  return (
    <UserCtx.Provider
      value={{
        user,
        loading,
        logOut,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};
export const useAuth = () => useContext(UserCtx);
export default UserProvider;
