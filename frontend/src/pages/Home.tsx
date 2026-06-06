import { useEffect, useState } from "react";
import { getPosts } from "../services/product.service";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
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
