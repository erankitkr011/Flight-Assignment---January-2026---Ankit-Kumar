import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../api";

const { LOGIN, REGISTER } = authEndpoints;

export const loginUser = async (data) => {
  return await apiConnector("POST", LOGIN, data);
};

export const registerUser = async (data) => {
  return await apiConnector("POST", REGISTER, data);
};
