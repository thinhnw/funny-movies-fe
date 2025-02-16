"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookies";

interface User {
  token: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Read token from cookies
    const token = getCookie("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      });

      const authHeader = response.headers.get("Authorization");
      const token = authHeader?.split(" ")[1];

      if (response.ok) {
        if (!token) {
          return { success: false, message: "Authentication token missing" };
        }
        // Set cookie with token
        setCookie("token", token, 1); // Expires in 1 day
        setUser({ token, email });
        return { success: true };
      }
      return { success: false, message: "Signup failed" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "An error occurred during signup" };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      });

      const authHeader = response.headers.get("Authorization");
      const token = authHeader?.split(" ")[1];

      if (response.ok) {
        if (!token) {
          return { success: false, message: "Authentication token missing" };
        }
        // Set cookie with token
        setCookie("token", token, 1); // Expires in 1 day
        setUser({ token, email });
        return { success: true };
      }
      return { success: false, message: "Login failed" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "An error occurred during login" };
    }
  };

  const logout = async () => {
    await fetch("http://localhost:3000/logout", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    // Remove cookie
    deleteCookie("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
