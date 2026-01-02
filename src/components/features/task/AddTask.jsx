// components/AddTask.jsx
import React, { useEffect, useState } from "react";
import { apiEndpoints } from "../../../constants/api-endpoints/task/task";
import { userApiEndpoints } from "../../../constants/api-endpoints/user/user";
import { api } from "../../../api/apiInterceptors";
import UserSearchSelect from "./UserSearchSelect";

const AddTask = ({ onClose, onTaskCreated }) => {
  const [loading, setLoading] = useState(false);
  const [assignedUser, setAssignedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    dueDate: "",
  });

  const categories = ["Work", "Personal", "Urgent", "Shopping", "Health"];

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const fetchUsers = async () => {
    try {
      const res = await api({
        endpoint: userApiEndpoints.ENDPOINTS_NEW_USER_LISTING, // your backend API
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api({
        endpoint: apiEndpoints.ENDPOINTS_CREATE_TASK,
        payloadData: {
          title: task.title,
          description: task.description,
          category: task.category.toLowerCase(), // match backend enum
          priority: task.priority.toLowerCase(),
          userId: assignedUser,
        },
        method: "POST",
        withToken: true,
      });

      onTaskCreated();
      onClose();
    } catch (error) {
      console.error(error);
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

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={task.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <select
          name="category"
          value={task.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        >
          <option value="">Select Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* <div>
          <input
            type="text"
            placeholder="Search user..."
            value={searchUser}
            onChange={(e) => {
              setSearchUser(e.target.value);
              fetchUsers(); // fetch when typing
            }}
            className="w-full px-4 py-2 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <select
            name="assignedUser"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Assign User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div> */}
        <div className="space-y-2">
      

          {/* Dropdown */}
          <UserSearchSelect
            users={users}
            value={assignedUser}
            onChange={setAssignedUser}
            searchValue={searchUser}
            onSearchChange={(val) => {
              setSearchUser(val);
              fetchUsers(); // debounced recommended
            }}
            placeholder="Assign user"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
