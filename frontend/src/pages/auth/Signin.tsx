import { useState } from "react";
import { signInApi } from "../../services/auth.service";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Signin Data:", formData);

      const response = await signInApi(formData);

      if (!response.success) {
        return alert(response?.message || "Something went wrong!");
      }

      alert(response.message || "Signin successful");
    } catch (error) {
      console.error(error);
      // alert()
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>

      <div>
        <label>Email</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Password</label>
        <br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <button type="submit">Sign In</button>
    </form>
  );
}
