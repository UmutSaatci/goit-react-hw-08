import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectFilterName = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilterName],

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
