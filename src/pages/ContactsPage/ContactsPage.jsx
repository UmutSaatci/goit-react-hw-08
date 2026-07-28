import styles from "./ContactsPage.module.css";

export default function ContactsPage({ children }) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>İletişim Listem</h2>
      </div>
      <div className={styles.contentGrid}>{children}</div>
    </div>
  );
}
