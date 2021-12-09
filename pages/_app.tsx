import { AppProps } from "next/app";
import React from "react";
import { Header } from "../components/Header";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
