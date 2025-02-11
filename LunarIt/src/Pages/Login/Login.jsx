import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { MyAuthContext } from "../../Components/Dashboard/index";
import { fetchStudentsByEmail } from "../../Js";
import { ToastContainer, toast } from "react-toastify";
import bcrypt from "bcryptjs";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated } = useContext(MyAuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const data = await fetchStudentsByEmail(formData.email);
  
      if (!data || data.length === 0) {
        toast.error("No User Found!");
        return;
      }
  
      const isPasswordMatch = await bcrypt.compare(formData.password, data.password);
      
      if (isPasswordMatch) {
        toast.success("User Found!");
        setIsAuthenticated(true);
        navigate("/form");
      } else {
        setError(true);
        toast.error("Incorrect Email or Password.");
      }
    } catch (error) {
      setError(true);
      setFormData({ email: "", password: "" });
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
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
              placeholder="Password"
              id="login-password"
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
