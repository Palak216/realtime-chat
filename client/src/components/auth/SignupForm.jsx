import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signupUser } from "../../services/authService";

const SignupForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const data = await signupUser(formData);

      toast.success(data.message || "Account Created Successfully");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] bg-slate-800 p-8 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-700 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-semibold"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;