import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/apiInterceptors";
import { apiEndpoints } from "../constants/api-endpoints/task/task";
import {
  ArrowLeftIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

/* ---------- Color Maps ---------- */
const statusColor = {
  pending: "bg-yellow-50 text-yellow-700",
  completed: "bg-emerald-50 text-emerald-700",
  inprogress: "bg-sky-50 text-sky-700",
};

const priorityColor = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-50 text-yellow-700",
  high: "bg-red-50 text-red-700",
};

const categoryColor = {
  work: "bg-indigo-50 text-indigo-700",
  personal: "bg-pink-50 text-pink-700",
  health: "bg-green-50 text-green-700",
};

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);

  /* ---------- Fetch Task ---------- */
  const fetchTask = async () => {
    return api({
      endpoint: `${apiEndpoints.ENDPOINTS_TASK_DETAILS}/${taskId}`,
      method: "GET",
    });
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["task-details", taskId],
    queryFn: fetchTask,
  });

  const task = data?.task;

  /* ---------- Sync Form State ---------- */
  useEffect(() => {
    if (task) {
      setForm(task);
    }
  }, [task]);

  /* ---------- Handlers ---------- */
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    await api({
      endpoint: `${apiEndpoints.ENDPOINTS_TASK_UPDATE}/${taskId}`,
      method: "PUT",
      payloadData: {
        title: form.title,
        description: form.description,
        status: form.status,
        priority: form.priority,
        category: form.category,
      },
    });

    setEditMode(false);

    queryClient.invalidateQueries({ queryKey: ["task-details", taskId] });
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const handleDelete = async () => {
    await api({
      endpoint: `${apiEndpoints.ENDPOINTS_TASK_DELETE}/${taskId}`,
      method: "DELETE",
    });

    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    navigate("/tasks");
  };

  /* ---------- States ---------- */
  if (isLoading || !form) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        Loading task...
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Failed to load task details.
      </p>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-sky-900 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Tasks
        </button>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm p-6">

          {/* Header */}
          <div className="flex justify-between mb-6">
            <h1 className="text-xl font-semibold dark:text-white">Task Details</h1>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-100"
              >
                <PencilIcon className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex gap-1 px-3 py-2 text-sm rounded-lg bg-sky-900 text-white"
                >
                  <CheckIcon className="w-4 h-4" />
                  Save
                </button>

                <button
                  onClick={() => {
                    setForm(task);
                    setEditMode(false);
                  }}
                  className="flex gap-1 px-3 py-2 text-sm border rounded-lg"
                >
                  <XMarkIcon className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {/* Selects */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={!editMode}
              className={`px-3 py-2 border rounded-lg ${statusColor[form.status]}`}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="inprogress">In Progress</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              disabled={!editMode}
              className={`px-3 py-2 border rounded-lg ${priorityColor[form.priority]}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={!editMode}
              className={`px-3 py-2 border rounded-lg ${categoryColor[form.category]}`}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="health">Health</option>
            </select>
          </div>

          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full px-4 py-2 border rounded-lg mb-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <div className="text-sm text-gray-500 mb-6">
            Created: {new Date(task.createdAt).toLocaleString()} · Updated:{" "}
            {new Date(task.updatedAt).toLocaleString()}
          </div>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-sm text-red-600"
          >
            <TrashIcon className="w-4 h-4" />
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
