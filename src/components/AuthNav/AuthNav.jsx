import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

export const AuthNav = () => {
  return (
    <div className={styles.container}>
      <NavLink to="/register" className={styles.link}>
        Kayıt Ol
      </NavLink>
      <NavLink to="/login" className={styles.link}>
        Giriş Yap
      </NavLink>
    </div>
  );
};
