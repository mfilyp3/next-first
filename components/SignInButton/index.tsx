import style from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export function SignInButton() {
  const isUserLogged = true;
  return isUserLogged ? (
    <button type="button" className={style.signInBtn}>
      <FaGithub color="#eba417" />
      Sign In with GitHub
      <FiX color="#737380" className={style.closeIcon} />
    </button>
  ) : (
    <button type="button" className={style.signInBtn}>
      <FaGithub color="#eba417" />
      Sign In with GitHub
    </button>
  );
}
