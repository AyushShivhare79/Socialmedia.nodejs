import { useState } from "react";
import { signInApi } from "../../services/auth.service";
import { useNavigate } from "react-router";
import styles from "./Auth.module.css";

export default function Signin() {
  const navigate = useNavigate();
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
    <div className={styles.authPage}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoIcon}>🔐</div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to continue to your feed</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
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
            Sign In
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{" "}
          <span className={styles.footerLink} onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
