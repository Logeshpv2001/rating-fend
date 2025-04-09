import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utilities/Axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password, "data");

    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const role = response?.data?.user?.role;
      console.log(role, "role");

      console.log(response, "res");

      if (response.data && response.data.user) {
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            password: password,
            role: role,
            token: response.data.token,
          })
        );

        setTimeout(() => {
          switch (role) {
            case "admin":
              navigate("/admin", { replace: true });
              break;
            case "owner":
              navigate("/owner", { replace: true });
              break;
            case "user":
              navigate("/user", { replace: true });
              break;
            default:
              navigate("/", { replace: true });
          }
        }, 100);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in
        </h2>
        <form className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <button
              onClick={handleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full flex justify-center py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-blue-600 hover:text-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
