import api from "../api/axios";

export const getPostsApi = async () => {
  const response = await api.get("/post");

  return response.data;
};

export const createPostApi = async (payload: {
  title: string;
  description: string;
}) => {
  const response = await api.post("post/create", payload);

  return response.data;
};

export const editPostApi = async () => {
  const response = await api.put("/post/edit");

  return response.data;
};

export const deletePostApi = async () => {
  const response = await api.delete("/post");

  return response.data;
};
