import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  createCommentApi,
  getCommentApi,
} from "../../services/comment.service";

export default function Comment() {
  const { state } = useLocation();
  const postId = state?.postId;

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  const handleComment = async () => {
    if (!postId) return;

    const response = await createCommentApi({
      postId: Number(postId),
      comment,
    });

    if (response) {
      alert(response.message);

      const commentsResponse = await getCommentApi(Number(postId));
      setComments(commentsResponse.data);

      setComment("");
    }
  };

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      const response = await getCommentApi(Number(postId));

      console.log("Get commeeeeeeeent: ", response)

      setComments(response.data);
    };

    fetchComments();
  }, [postId]);

  return (
    <>
      <div>Post #{postId}</div>

      <div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />

        <button onClick={handleComment}>Comment</button>
      </div>

      <div>
        <h3>Comments</h3>

        {comments.map((item: any) => (
          <div key={item.id}>
            <p>{item.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}
