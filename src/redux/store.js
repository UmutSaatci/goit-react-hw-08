import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice"; // contacts slice dosyanızın yolu
import filtersReducer from "./filtersSlice"; // YENİ EKLEDİĞİMİZ: filters slice dosyanızın yolu

export const store = configureStore({
  reducer: {
    // Sol taraftaki isimler (contacts ve filters) selectors.js dosyasında
    // state.contacts ve state.filters olarak çağırdığımız isimlerdir.
    contacts: contactsReducer,
    filters: filtersReducer, // filtersSlice bu satır ile store'a bağlandı!
  },
});
