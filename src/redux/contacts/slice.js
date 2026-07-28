import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContacts,
  deleteContacts,
  updateContact,
} from "./operations";
import { logoutUser } from "../auth/operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  // Eğer payload bir nesneyse veya boşsa hata mesajını string olarak kaydet
  state.error = action.payload || action.error?.message || "Bir hata oluştu";
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContacts.pending, handlePending)
      .addCase(addContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (
          action.payload &&
          typeof action.payload === "object" &&
          "name" in action.payload
        ) {
          state.items.push(action.payload);
        }
      })
      .addCase(addContacts.rejected, handleRejected)
      .addCase(deleteContacts.pending, handlePending)
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const deletedId =
          typeof action.payload === "object"
            ? action.payload?.id
            : action.payload;
        state.items = state.items.filter((item) => item.id !== deletedId);
      })
      .addCase(deleteContacts.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, (state) => {
        state.items = [];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Güncellenen kişiyi listede bul ve yerine yeni gelen veriyi koy
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default contactsSlice.reducer;
