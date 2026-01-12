import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
  },
  reducers: {
    setWalletBalance: (state, action) => {
      state.balance = action.payload;
    },
    clearWallet: (state) => {
      state.balance = 0;
    },
  },
});

export const { setWalletBalance, clearWallet } = walletSlice.actions;
export default walletSlice.reducer;
