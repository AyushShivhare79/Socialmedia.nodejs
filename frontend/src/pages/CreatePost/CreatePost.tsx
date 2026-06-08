import { useState } from "react";
import { createPostApi } from "../../services/post.service";
import { useNavigate } from "react-router";
import styles from "./CreatePost.module.css";

export default function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      const response = await createPostApi(formData);
      console.log(response.data);

      setFormData({
        title: "",
        description: "",
      });

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <button className={styles.backBtn} onClick={() => navigate("/home")}>
            ←
          </button>
          <h1 className={styles.title}>Create Post</h1>
        </div>

        <form className={styles.form} onSubmit={handlePublish}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              type="text"
              name="title"
              placeholder="Give your post a title..."
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              name="description"
              placeholder="Write something interesting..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button className={styles.publishBtn} type="submit">
            ✨ Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
