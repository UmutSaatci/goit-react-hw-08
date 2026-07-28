import { useSelector } from "react-redux";
import { Navigation } from "../Navigation/Navigation";
import { AuthNav } from "../AuthNav/AuthNav";
import { UserMenu } from "../UserMenu/UserMenu";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./AppBar.module.css";

export const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={styles.header}>
      <Navigation />
      {/* Giriş durumuna göre AuthNav veya UserMenu gösterimi */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
