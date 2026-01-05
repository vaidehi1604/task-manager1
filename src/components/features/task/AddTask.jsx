import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { apiEndpoints } from "../../../constants/api-endpoints/task/task";
import { userApiEndpoints } from "../../../constants/api-endpoints/user/user";
import { api } from "../../../api/apiInterceptors";
import UserSearchSelect from "./UserSearchSelect";

const validationSchema = Yup.object({
  title: Yup.string().required("Task title is required"),
  category: Yup.string().required("Category is required"),
  priority: Yup.string().required("Priority is required"),
  assignedUser: Yup.string().required("Please assign a user"),
});

const AddTask = ({ onClose, onTaskCreated }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  const categories = ["Work", "Personal", "Urgent", "Shopping", "Health"];

  const fetchUsers = async () => {
    try {
      const res = await api({
        endpoint: userApiEndpoints.ENDPOINTS_NEW_USER_LISTING,
        method: "GET",
        withToken: true,
        showToast: false,
      });
      setUsers(res?.users || res?.data?.users || []);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api({
        endpoint: apiEndpoints.ENDPOINTS_CREATE_TASK,
        method: "POST",
        withToken: true,
        payloadData: {
          title: values.title,
          description: values.description,
          category: values.category.toLowerCase(),
          priority: values.priority.toLowerCase(),
          userId: values.assignedUser,
        },
      });

      onTaskCreated();
      onClose();
    } catch (error) {
      alert(error?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 dark:bg-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Add New Task
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Create a new task for your dashboard
      </p>

      <Formik
        initialValues={{
          title: "",
          description: "",
          category: "",
          priority: "",
          assignedUser: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <Input
              name="title"
              placeholder="Task title"
              value={values.title}
              onChange={handleChange}
              error={touched.title && errors.title}
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              value={values.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            {/* Category */}
            <Select
              name="category"
              value={values.category}
              onChange={handleChange}
              error={touched.category && errors.category}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>

            {/* Priority */}
            <Select
              name="priority"
              value={values.priority}
              onChange={handleChange}
              error={touched.priority && errors.priority}
            >
              <option value="">Select Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Select>

            {/* Assign User (Formik Controlled) */}
            <div>
              <UserSearchSelect
                users={users}
                value={values.assignedUser}
                onChange={(val) => setFieldValue("assignedUser", val)}
                searchValue={searchUser}
                onSearchChange={(val) => {
                  setSearchUser(val);
                  fetchUsers();
                }}
                placeholder="Assign user"
              />
              {touched.assignedUser && errors.assignedUser && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assignedUser}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Add Task"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

const Input = ({ error, ...props }) => (
  <div>
    <input
      {...props}
      className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Select = ({ error, children, ...props }) => (
  <div>
    <select
      {...props}
      className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      {children}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default AddTask;
