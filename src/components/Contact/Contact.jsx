import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteContacts, updateContact } from "../../redux/contacts/operations";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import css from "./Contact.module.css";

// Kullanılan modern ikon paketleri
import {
  BsFillPersonFill,
  BsFillTelephoneFill,
  BsPencilSquare,
  BsCheckLg,
  BsXLg,
} from "react-icons/bs";

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Düzenleme modu state'leri
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(contact.name);
  const [editNumber, setEditNumber] = useState(contact.number);

  if (!contact || !contact.id) return null;

  // SİLME ONAYI
  const handleDeleteConfirm = () => {
    dispatch(deleteContacts(contact.id))
      .unwrap()
      .then(() => toast.success(`${contact.name} başarıyla silindi.`))
      .catch(() => toast.error("Kişi silinirken bir hata oldu!"));
    setIsModalOpen(false);
  };

  // GÜNCELLEME KAYDETME
  const handleSave = () => {
    if (editName.trim() === "" || editNumber.trim() === "") {
      toast.error("Alanlar boş bırakılamaz!");
      return;
    }

    dispatch(
      updateContact({ id: contact.id, name: editName, number: editNumber }),
    )
      .unwrap()
      .then(() => {
        toast.success("Değişiklikler kaydedildi.");
        setIsEditing(false);
      })
      .catch(() => toast.error("Güncellenirken bir hata oluştu!"));
  };

  // İPTAL ETME
  const handleCancel = () => {
    setEditName(contact.name);
    setEditNumber(contact.number);
    setIsEditing(false);
  };

  return (
    <div className={css.contactItem}>
      <div className={css.contactInfo}>
        {isEditing ? (
          //  DÜZENLEME FORMU
          <div className={css.editFormContainer}>
            <div className={css.modernInputWrapper}>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className={css.editInput}
                placeholder="İsim"
              />
              <span className={css.inputIcon}>
                <BsFillPersonFill />
              </span>
            </div>
            <div className={css.modernInputWrapper}>
              <input
                type="text"
                value={editNumber}
                onChange={(e) => setEditNumber(e.target.value)}
                className={css.editInput}
                placeholder="Telefon"
              />
              <span className={css.inputIcon}>
                <BsFillTelephoneFill />
              </span>
            </div>
          </div>
        ) : (
          // NORMAL GÖRÜNÜM MODU
          <>
            <p>
              <span className={css.iconWrapper}>
                <BsFillPersonFill />
              </span>
              {contact.name}
            </p>
            <p>
              <span className={css.iconWrapper}>
                <BsFillTelephoneFill />
              </span>
              {contact.number}
            </p>
          </>
        )}
      </div>

      {/* AKSİYON BUTON GRUBU */}
      <div className={css.actionBtnGroup}>
        {isEditing ? (
          <>
            <button
              type="button"
              className={`${css.actionBtn} ${css.saveBtn}`}
              onClick={handleSave}
              title="Kaydet"
            >
              <BsCheckLg size={16} />
            </button>
            <button
              type="button"
              className={`${css.actionBtn} ${css.cancelBtn}`}
              onClick={handleCancel}
              title="Vazgeç"
            >
              <BsXLg size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`${css.actionBtn} ${css.editBtn}`}
              onClick={() => setIsEditing(true)}
              title="Düzenle"
            >
              <BsPencilSquare size={16} />
            </button>
            <button
              type="button"
              className={css.deleteBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Sil
            </button>
          </>
        )}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        contactName={contact.name}
      />
    </div>
  );
};
