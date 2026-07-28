import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import styles from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={styles.container}>
      <p className={styles.welcomeText}>
        Hoş geldin <span className={styles.username}>{user.name}</span>
      </p>
      <button
        type="button"
        className={styles.logoutButton}
        onClick={() => dispatch(logoutUser())}
      >
        Çıkış Yap
      </button>
    </div>
  );
};
