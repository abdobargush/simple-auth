"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { RegisterUser } from "@/types";
import axios from "axios";

const COOKIE_AUTH_KEY = "isAuth";
const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const cookieAuth = Cookies.get(COOKIE_AUTH_KEY);
    if (cookieAuth) setIsAuth(true);
  }, []);

  const login = (email: string, password: string) =>
    new Promise<void>((resolve, reject) => {
      axios
        .post(`${API_URL}/auth/login`, { email, password })
        .then(({ data }) => {
          Cookies.set(COOKIE_AUTH_KEY, data.token, { expires: 3 });
          setIsAuth(true);
          resolve(data);
        })
        .catch((error) => {
          const res = error.response.data;
          const message = Array.isArray(res.message)
            ? res.message[0]
            : res.message;
          reject(message);
        });
    });

  const register = (user: RegisterUser) =>
    new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/auth/register`, user)
        .then(({ data }) => {
          Cookies.set(COOKIE_AUTH_KEY, data.token, { expires: 3 });
          setIsAuth(true);
          resolve(data);
        })
        .catch((error) => {
          const res = error.response.data;
          const message = Array.isArray(res.message)
            ? res.message[0]
            : res.message;
          reject(message);
        });
    });

  const logout = () =>
    new Promise<void>((resolve) => {
      Cookies.remove(COOKIE_AUTH_KEY);
      setIsAuth(false);
      resolve();
    });

  const getUser = () =>
    new Promise<{ name: string }>((resolve, reject) => {
      axios
        .get(`${API_URL}/auth/me`, {
          headers: {
            "Authorization": `Bearer ${Cookies.get(COOKIE_AUTH_KEY)}`,
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });

  return {
    isAuth,
    getUser,
    login,
    logout,
    register,
  };
};

export default useAuth;
