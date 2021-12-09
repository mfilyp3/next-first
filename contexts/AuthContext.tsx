import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

interface IAuthContextData {
  isAuthenticated: boolean;
  signIn(data: ISignInProps): void;
  user: User;
}

interface ISignInProps {
  code: string;
}

interface User {
  login: string;
  email: string;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@mfilype:token": token } = parseCookies();

    if (token) {
      pickUserData(token);
    }
  }, []);

  async function signIn({ code }: ISignInProps) {
    if (code) {
      const getUserData = await axios.post(`/api/github?code=${code}`);
      let { data } = getUserData;

      if (String(data).startsWith("access_token=")) {
        data = data.replace("access_token=", "");

        axios.defaults.headers.common["Authorization"] = `Token ${data}`;

        setCookie(undefined, "@mfilype:token", data, {
          maxAge: 60 * 60 * 1, //1hora
        });

        pickUserData(data);
      }
    }
  }

  async function pickUserData(token: string) {
    if (!token) return false;

    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setUser(data.login);
      });
  }
  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
