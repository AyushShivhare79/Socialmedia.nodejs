import { useState } from "react";
import { createPostApi } from "../../services/product.service";

export default function CreatePost() {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handlePublish}>
      <h2>Create Post</h2>

      <div>
        <label>Title</label>
        <br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Description</label>
        <br />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <button type="submit">Publish</button>
    </form>
  );
}
