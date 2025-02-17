import "./index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { loginAdmin } from "../../Js";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await loginAdmin(formData.email, formData.password);

      if (response.error) {
        toast.error(response.error);
        setError(true);
      } else {
        toast.success("Login Successful!");
        navigate("/home");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      {loading && (
        <div className="fixed w-screen h-screen backdrop-blur-[1px] bg-[#00000022] z-[100]"></div>
      )}
      <h1 className="font-bold text-2xl text-nowrap">Digital Pathsala</h1>
      <i className="text-gray-500">(Employee Only)</i>
      <div className="login-container">
        <h2 className="text-2xl">Log In</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={error ? "input error-input" : "input"}
            required
          />
          <p className="error-msg">
            {error ? "*Check your email properly" : ""}
          </p>

          <div className="password-field">
            <div
              className="eye-field"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <RemoveRedEyeOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="login-password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={error ? "input error-input" : "input"}
              required
            />
          </div>
          <p className="error-msg">
            {error ? "*Check your password properly" : ""}
          </p>

          <button type="submit" className="login-button">
            {loading ? <CircularProgress size={12} color="white" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
