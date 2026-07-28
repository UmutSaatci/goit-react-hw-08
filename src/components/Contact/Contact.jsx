import { useDispatch } from "react-redux";
import { deleteContacts } from "../../redux/operations"; // operations.js dosyanızın yolu
import css from "./Contact.module.css";

// Kullanmış olduğunuz ikonları import ediyoruz
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  // Güvenlik Duvarı: Eğer veri bir şekilde bozuk veya eksik gelirse bileşenin çökmesini engeller
  if (!contact || !contact.id) {
    return null;
  }

  // Silme butonuna basıldığında sadece ilgili kişinin ID'sini asenkron operasyona gönderir
  const handleDelete = () => {
    dispatch(deleteContacts(contact.id));
  };

  return (
    <div className={css.contactItem}>
      <div className={css.contactInfo}>
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
      </div>

      <button type="button" className={css.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
