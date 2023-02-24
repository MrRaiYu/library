import { createContext, useContext } from "react";

export const AuthContext = createContext({
    user: undefined,
    isLoading: false,
    setUser: (p: object) => {},
});

export const useAuthContext = () => useContext(AuthContext);