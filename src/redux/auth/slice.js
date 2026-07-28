import { createSlice } from "@reduxjs/toolkit";
import {
  signupUser,
  loginUser,
  logoutUser,
  refreshUserToken,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      // ==========================================
      // 1. SIGNUP USER
      // ==========================================
      .addCase(signupUser.pending, (state) => {
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        // Kayıt sonrası API direkt token ve kullanıcı dönüyorsa otomatik giriş yaptırılır
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload; // Örn: "Bu e-posta adresi zaten kullanımda"
      })

      // ==========================================
      // 2. LOGIN USER
      // ==========================================
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload;
      })

      // ==========================================
      // 3. LOGOUT USER
      // ==========================================
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Sunucuda oturum başarıyla kapatıldı, lokal verileri sıfırla
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Sunucu hata dönse bile kullanıcının takılı kalmaması için veriler sıfırlanır
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = action.payload;
      })

      // ==========================================
      // 4. REFRESH USER TOKEN
      // ==========================================
      .addCase(refreshUserToken.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.user = action.payload; // Sunucudan gelen { name, email } bilgisini yazar
        state.isLoggedIn = true; // Oturumu aktif hale getirir
        state.isRefreshing = false;
      })
      .addCase(refreshUserToken.rejected, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;
