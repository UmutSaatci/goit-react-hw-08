import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectFilterName = (state) => state.filters.name;
export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  // 1. Bağımlılıklar: Sadece contacts ve filterName değiştikçe bu seçici tetiklenir.
  // loading veya error değiştiğinde filtreleme işlemi ASLA tekrar çalışmaz.
  [selectContacts, selectFilterName],

  // 2. Filtreleme Mantığı: Bağımlılıklardan gelen temiz veriler işlenir
  (contacts, filterName) => {
    // Güvenlik önlemi: Veriler henüz yüklenmediyse boş dizi dön
    if (!contacts) return [];

    const searchValue = (filterName || "").toLowerCase();

    return contacts.filter((contact) => {
      const contactName = contact.name?.toLowerCase() || "";
      const contactNumber = contact.number?.toString() || "";

      return (
        contactName.includes(searchValue) || contactNumber.includes(searchValue)
      );
    });
  },
);
