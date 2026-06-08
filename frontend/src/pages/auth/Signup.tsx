import { useState } from "react";
import { signUpApi } from "../../services/auth.service";
import { useNavigate } from "react-router";
import styles from "./Auth.module.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await signUpApi(formData);

      if (!response.success) {
        return alert(response?.message || "Something went wrong!");
      }

      alert(response.message || "Signup successful");
    } catch (error) {
      console.error(error);
      // alert()
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoIcon}>✨</div>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join the community today</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className={styles.submitBtn} type="submit">
            Create Account
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <span className={styles.footerLink} onClick={() => navigate("/signin")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
