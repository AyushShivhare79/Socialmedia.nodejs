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

export const editPostApi = async (payload: {
  postId: number;
  title: string;
  description: string;
}) => {
  const response = await api.put("/post/edit", payload);

  return response.data;
};

export const deletePostApi = async (postId: number) => {
  const response = await api.delete("/post", { params: { postId: postId } });

  return response.data;
};
