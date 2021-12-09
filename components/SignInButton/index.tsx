import style from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function SignInButton() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=d4b04cb851482fe95a18`;
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useContext(AuthContext);

  useEffect(() => {
    const code = window.location.href.split("?code=")[1];
    signIn({ code });
  }, []);

  return user ? (
    <button type="button" className={style.signInBtn}>
      <FaGithub color="#17eb5e" />
      Ei, {user}
      <FiX color="#737380" className={style.closeIcon} />
    </button>
  ) : (
    <button
      onClick={() => {
        window.location.href = signInUrl;
      }}
      type="button"
      className={style.signInBtn}
    >
      <FaGithub color="#eba417" />
      Sign In with GitHub
      {isLoading && <div className="loader"></div>}
    </button>
  );
}
