import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);

      // Başarılı kayıtta gelen token'ı axios başlığına ekle
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      // sunucu mesajını yakalıyoruz:
      const serverErrorMessage = error.response?.data?.message || error.message;

      // Eğer e-posta çakışması varsa
      if (error.response?.status === 400) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.name === "MongoError" ||
            serverErrorMessage.includes("duplicate")
            ? "Bu e-posta adresiyle zaten bir hesap oluşturulmuş!"
            : "Kayıt başarısız: Şifrenizin en az 7 karakter olduğundan emin olun.",
        );
      }

      return thunkAPI.rejectWithValue(serverErrorMessage);
    }
  },
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);
      // Giriş yapıldığında gelen token'ı axios'a ekle
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/users/logout");
      // Çıkışta temizle
      clearAuthHeader();
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// REFRESH (Oturum Yenileme - Sayfa F5 atıldığında çalışan yer)
export const refreshUserToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Token bulunamadı");
    }

    try {
      // Sayfa yenilendiğinde localStorage'dan okunan token'ı tekrar Axios'a tanıtıyoruz!
      setAuthHeader(persistedToken);

      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      // Eğer token süresi dolmuşsa veya geçersizse axios başlığını temizle
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
