import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataService } from "../services/data-service";

type AuthContextProps = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId: string | null;
  token: string | null;
  handleSignup: (payload: SignupPayloadProps) => Promise<void>;
  handleLogin: (payload: LoginPayloadProps) => Promise<void>;
  handleLogout: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

type SignupPayloadProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

type LoginPayloadProps = {
  email: string;
  password: string;
};

type DecodedTokenProps = {
  aud: string;
  sub: string;
};

type UserDataProps = (token: string, decodedToken: DecodedTokenProps) => void;

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("authToken");
    if (storedToken) {
      const decodedStoreToken: DecodedTokenProps = jwtDecode(storedToken);
      userData(storedToken, decodedStoreToken);
    }
  }, []);

  const handleSignup = async (payload: SignupPayloadProps) => {
    try {
      const response = await DataService.postData("/auth/signup", payload);
      if (response.data) {
        const token = response.data.session.access_token;
        window.localStorage.setItem("authToken", token);
        const decodedToken: DecodedTokenProps = jwtDecode(token);
        userData(token, decodedToken);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLogin = async (payload: LoginPayloadProps) => {
    try {
      const response = await DataService.postData("/auth/login", payload);
      if (response.error) {
        console.error(response.error);
      } else if (response.data) {
        const token = response.data.session.access_token;
        window.localStorage.setItem("authToken", token);
        const decodedToken: DecodedTokenProps = jwtDecode(token);
        userData(token, decodedToken);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLogout = async () => {
    setUserId(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    window.localStorage.removeItem("authToken");
  };

  const fetchUserData = async (userId: string) => {
    try {
      const responseUserPublic = await DataService.getData(`/api/users/${userId}`);
      if (responseUserPublic) {
        const userRole = responseUserPublic.user.role;
        if (userRole === "admin") {
          setIsAdmin(true);
        }
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const userData: UserDataProps = (token, decodedToken) => {
    if (token) {
      setToken(token);
    }
    if (decodedToken.aud === "authenticated") {
      setIsAuthenticated(true);
    }
    if (decodedToken.sub) {
      setUserId(decodedToken.sub);
      fetchUserData(decodedToken.sub);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        userId,
        token,
        handleSignup,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
