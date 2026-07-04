import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================
  // Handle Input Change
  // ==========================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================
  // Handle Login
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      console.log("✅ Login Response:", response);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      // Save Token
      localStorage.setItem("token", response.token);

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      console.log(
        "Saved Token:",
        localStorage.getItem("token")
      );

      console.log(
        "Saved User:",
        localStorage.getItem("user")
      );

      toast.success("Login Successful 🎉");

      navigate("/chat");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 shadow-2xl rounded-3xl p-8 w-full max-w-md">

      <h1 className="text-4xl font-bold text-center text-cyan-400">
        Welcome Back 👋
      </h1>

      <p className="text-center text-slate-400 mt-2 mb-8">
        Login to continue chatting
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="text-slate-300 mb-2 block">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="text-slate-300 mb-2 block">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition font-semibold text-white"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <p className="text-center text-slate-400 mt-6">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-cyan-400 hover:underline"
        >
          Signup
        </Link>
      </p>

    </div>
  );
};

export default LoginForm;