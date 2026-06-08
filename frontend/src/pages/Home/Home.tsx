import { useEffect, useState } from "react";
import { getPostsApi } from "../../services/product.service";
import { useNavigate } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPostsApi();
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <button onClick={() => navigate("/home")}>Create new post</button>
      {posts.map((value, index) => {
        return (
          <div key={index}>
            <div>
              <div>Title</div>
              <div>{value?.title}</div>
            </div>
            <br />
            <div>
              <div>Description</div>
              <div>{value?.description}</div>
            </div>
            <br />
          </div>
        );
      })}
    </>
  );
}
