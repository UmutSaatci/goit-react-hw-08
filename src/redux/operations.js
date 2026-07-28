import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://6a5b69bb64f700df5bd6eb3e.mockapi.io/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// 🛠️ DÜZELTME: Tek bir nesne (contactData) alıyoruz ve içinden name ile number'ı parçalıyoruz (destructuring)
export const addContacts = createAsyncThunk(
  "contacts/addContacts",
  async ({ name, number }, thunkAPI) => {
    try {
      // 🛠️ DÜZELTME: API'ye 'text' değil, rehber standardı olan 'name' gönderiyoruz
      const response = await axios.post("contacts", { name, number });
      return response.data;
    } catch (error) {
      // Artık thunkAPI doğru konumda olduğu için burası sorunsuz çalışacaktır!
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteContacts = createAsyncThunk(
  "contacts/deleteContacts",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
