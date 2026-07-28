import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./PrivateRoute.module.css";

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/login",
}) => {
  const { isLoggedIn, isRefreshing } = useSelector((state) => state.auth);

  // Arka planda token yenileniyorsa animasyonlu yükleme ekranını göster
  if (isRefreshing) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>
          Oturum doğrulanıyor, lütfen bekleyin...
        </p>
      </div>
    );
  }

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
