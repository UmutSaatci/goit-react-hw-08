import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContacts, deleteContacts } from "./operations";

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
        // action.payload'ın doğrudan API'den gelen dizi ([{id, name, number}, ...]) olduğundan emin olun
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
      .addCase(deleteContacts.rejected, handleRejected);
  },
});

export default contactsSlice.reducer;
