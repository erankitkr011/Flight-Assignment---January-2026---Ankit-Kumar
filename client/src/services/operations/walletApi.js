import { apiConnector } from "../apiConnector";
import { walletEndpoints } from "../api";

export const getWalletBalance = async (token) => {
  const response = await apiConnector(
    "GET",
    walletEndpoints.GET_WALLET_BALANCE,
    null,
    {
      Authorization: `Bearer ${token}`,
    }
  );

  return response;
};
