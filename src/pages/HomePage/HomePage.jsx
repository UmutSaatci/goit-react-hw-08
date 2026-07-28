import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PhoneBook</h1>
      <p className={styles.description}>
        Bu uygulama, iletişim listenizi güvenle yönetmeniz için
        geliştirilmiştir.
      </p>
    </div>
  );
}
