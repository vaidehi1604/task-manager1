import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { api } from "../api/apiInterceptors";
import { userApiEndpoints } from "../constants/api-endpoints/user/user";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await api({
        endpoint: userApiEndpoints.ENDPOINTS_CHANGE_PASSWORD, // ADD in API constants
        method: "PUT",
        payloadData: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      });

      resetForm();
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Change Password
        </h2>

        {/* Form */}
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* Old Password */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Enter old password"
                  value={values.oldPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:text-sky-700 "
                />
                {touched.oldPassword && errors.oldPassword && (
                  <p className="text-red-500 text-sm">{errors.oldPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={values.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:text-sky-700 "
                />
                {touched.newPassword && errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:text-sky-700 "
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Btn */}
              <button
                type="submit"
                className="w-full bg-sky-700  text-white py-3 rounded-lg font-semibold hover:bg-sky-700  transition"
              >
                Update Password
              </button>
            </form>
          )}
        </Formik>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full text-center text-sky-700  hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
