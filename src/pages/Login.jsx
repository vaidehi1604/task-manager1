import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { api } from "../api/apiInterceptors";
import { userApiEndpoints } from "../constants/api-endpoints/user/user";
import { useNavigate } from "react-router-dom";
import { USER_ACCESS_TOKEN_KEY } from "../appConstants";
import { useAuth } from "../hooks/useAuth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// Example: apiEndpoints.ENDPOINTS_USER_LOGIN

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const { login } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setErrorMessage("");

    try {
      const res = await api({
        endpoint: userApiEndpoints.ENDPOINTS_USER_LOGIN,
        payloadData: {
          email: values.email,
          password: values.password,
        },
      });

      login(res.token, res.user);

      // Redirect to dashboard
      navigate("/dashboard");

      resetForm();
    } catch (error) {
      console.error("LOGIN FAILED:", error);
      setErrorMessage("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Task Manager
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Login to your account
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-600 text-center mb-4 text-sm">
            {errorMessage}
          </p>
        )}

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 dark:bg-gray-300"
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-300"
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 dark:bg-gray-300"
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>

                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-700 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>
          )}
        </Formik>

        {/* Footer */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-sky-700 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
