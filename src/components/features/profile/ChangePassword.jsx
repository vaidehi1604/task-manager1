import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../dialog/model";
import { api } from "../../../api/apiInterceptors";
import { userApiEndpoints } from "../../../constants/api-endpoints/user/user";
import { useNavigate } from "react-router-dom";
import { USER_ACCESS_TOKEN_KEY } from "../../../appConstants";

const ChangePassword = ({ isOpen, onClose }) => {
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
        endpoint: userApiEndpoints.ENDPOINTS_CHANGE_PASSWORD,
        method: "PUT",
        payloadData: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      });

      resetForm();
      onClose();
      localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Change Password
        </h2>

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
              <InputField
                label="Old Password"
                name="oldPassword"
                value={values.oldPassword}
                onChange={handleChange}
                error={touched.oldPassword && errors.oldPassword}
              />

              <InputField
                label="New Password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                error={touched.newPassword && errors.newPassword}
              />

              <InputField
                label="Confirm New Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={touched.confirmPassword && errors.confirmPassword}
              />

              <button
                type="submit"
                className="w-full bg-sky-700 text-white py-3 rounded-lg font-semibold hover:bg-sky-800 transition"
              >
                Update Password
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

const InputField = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
      {label}
    </label>

    <input
      type="password"
      name={name}
      value={value}
      onChange={onChange}
      className="
        w-full px-4 py-3 rounded-lg border
        bg-white text-gray-800 border-gray-300
        focus:outline-none focus:ring-2 focus:ring-sky-700
        dark:bg-gray-700 dark:text-white dark:border-gray-600
        dark:focus:ring-sky-500
      "
    />

    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default ChangePassword;
