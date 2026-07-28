import { createPortal } from "react-dom";
import { useEffect } from "react";
import styles from "./DeleteModal.module.css";

export const DeleteModal = ({ isOpen, onClose, onConfirm, contactName }) => {
  // ESC tuşuna basınca modalın kapanması bug koruması
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Modalı HTML'deki #root dışına, direkt body altına ışınlıyoruz (Portal)
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Kişiyi Sil</h3>
        <p className={styles.text}>
          <b>{contactName}</b> isimli kişiyi rehberinizden silmek istediğinize
          emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Vazgeç
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={onConfirm}
          >
            Evet, Sil
          </button>
        </div>
      </div>
    </div>,
    document.body, // DOM'da direkt en üste eklenir
  );
};
