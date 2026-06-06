import api from "../api/axios";

export const signInApi = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/signin", payload);

  return response.data;
};

export const signUpApi = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/signup", payload);

  return response.data;
};
