import { useEffect, useState } from "react";
import { deletePostApi, getPostsApi } from "../../services/post.service";
import { useNavigate } from "react-router";
import { getMe } from "../../services/auth.service";
import styles from "./Home.module.css";
import { Link } from "react-router";

export default function Home() {
  const [user, setUser] = useState<any>();
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleDelete = async (postId: number) => {
    try {
      await deletePostApi(postId);

      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await getMe();
      setUser(response);
    };

    const fetchPosts = async () => {
      const response = await getPostsApi();
      setPosts(response.data);
    };

    getUser();
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.logoMark}>📝</div>
          <h1 className={styles.title}>Feed</h1>
          {posts.length > 0 && (
            <span className={styles.postCount}>{posts.length} posts</span>
          )}
        </div>

        <button
          className={styles.createBtn}
          onClick={() => navigate("/create")}
        >
          <span className={styles.btnIcon}>+</span>
          New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📭</div>
          <h3 className={styles.emptyTitle}>No posts yet</h3>
          <p className={styles.emptyText}>
            Create your first post to get started and share with the community.
          </p>
        </div>
      ) : (
        <div className={styles.postsGrid}>
          {posts.map((post) => {
            const myPost = post?.userId === user?.id;

            return (
              <div
                onClick={() =>
                  navigate("/comment", {
                    state: {
                      postId: post?.id,
                    },
                  })
                }
                className={styles.postCard}
                key={post.id}
              >
                <div className={styles.postContent}>
                  <h2 className={styles.postTitle}>{post.title}</h2>

                  <p className={styles.postDescription}>{post.description}</p>
                </div>

                {myPost && (
                  <div className={styles.cardFooter}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(post.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
