import { useSelector } from "react-redux";
// Sadece ihtiyacımız olan seçicileri import ediyoruz
import {
  selectFilteredContacts,
  selectIsLoading,
  selectError,
} from "../../redux/selectors"; // selectors.js dosyanızın yolu

import css from "./ContactList.module.css";
import { Contact } from "../Contact/Contact";

export const ContactList = () => {
  // ÖDEVDE İSTENEN: createSelector ile oluşturulan seçiciyi doğrudan useSelector içinde çağırıyoruz
  const filteredContacts = useSelector(selectFilteredContacts);

  // Arayüzde yükleniyor ve hata mesajlarını göstermek için durumları çekiyoruz
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div className={css.listWrapper}>
      {/* Durum yönetim bildirimleri */}
      {isLoading && <p className={css.infoMessage}>Loading contacts...</p>}
      {error && <p className={css.errorMessage}>Error: {error}</p>}

      {/* Eğer veri yüklenmişse ve filtrelenmiş liste boş değilse listele */}
      {!isLoading && !error && filteredContacts.length > 0 ? (
        <ul className={css.contactUl}>
          {filteredContacts.map((contact) => {
            return (
              <li key={contact.id} className={css.contactLi}>
                <Contact contact={contact} />
              </li>
            );
          })}
        </ul>
      ) : (
        // Liste boşsa veya arama sonucu eşleşme bulunamadıysa gösterilecek mesaj
        !isLoading &&
        !error && <p className={css.emptyMessage}>No contacts found.</p>
      )}
    </div>
  );
};
