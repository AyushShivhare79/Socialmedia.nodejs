import api from "../api/axios";

export const getCommentApi = async (postId: number) => {
  const response = await api.get("/comment", {
    params: {
      postId,
    },
  });

  return response.data;
};

export const createCommentApi = async (payload: {
  postId: number;
  comment: string;
}) => {
  const response = await api.post("/comment", payload);

  return response.data;
};
