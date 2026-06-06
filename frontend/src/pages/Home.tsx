import { useEffect, useState } from "react";
import { getPostsApi } from "../services/product.service";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPostsApi();
      console.log("Responseeeeeeeeeee: ", response);
      setPosts(response);
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((value, index) => {
        return <div key={index}>{value}</div>;
      })}
    </>
  );
}
