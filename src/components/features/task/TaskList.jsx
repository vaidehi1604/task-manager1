import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/apiInterceptors";
import { apiEndpoints } from "../../../constants/api-endpoints/task/task";
import Pagination from "../../common/Pagination";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Modal from "../../../dialog/model";
import AddTask from "./AddTask";

/* ---------- Color Maps ---------- */
const priorityColor = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-50 text-yellow-700",
  high: "bg-red-50 text-red-700",
};

const statusColor = {
  pending: "bg-yellow-50 text-yellow-700",
  completed: "bg-emerald-50 text-emerald-700",
  inprogress: "bg-sky-50 text-sky-700",
};

const LIMIT = 10;

const TaskList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth(); // Access isAdmin

  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });

  /* ---------- Fetch Tasks ---------- */
  const fetchTasks = async () => {
    let apiEndpoint = isAdmin
      ? apiEndpoints.ENDPOINTS_ADMIN_TASK_LIST
      : apiEndpoints.ENDPOINTS_TASK_LIST;
    console.log(apiEndpoint, "apiEndpoint");
    const query = new URLSearchParams({
      page,
      limit: LIMIT,
      ...filters,
    }).toString();

    return api({
      endpoint: `${apiEndpoint}?${query}`,
      method: "GET",
      showToast: false,
    });
  };

  const { data, isLoading, isError } = useQuery({
  queryKey: ["tasks", page, filters, refresh],
  queryFn: fetchTasks,
  keepPreviousData: true,
});


  const tasks = data?.tasks || [];
  const totalPages = Math.ceil((data?.total || 0) / LIMIT);

  /* ---------- Delete ---------- */
  const handleDelete = async (taskId) => {
    await api({
      endpoint: `${apiEndpoints.ENDPOINTS_TASK_DELETE}/${taskId}`,
      method: "DELETE",
    });

    queryClient.invalidateQueries(["tasks"]);
  };

  /* ---------- Memoized Rows ---------- */
  const rows = useMemo(
    () =>
      tasks.map((task, index) => (
        <tr
          key={task._id}
          className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700"
        >
          <td className="px-5 py-4">{(page - 1) * LIMIT + index + 1}</td>

          <td className="px-2 py-2 font-medium">{task.title}</td>

          <td className="px-2 py-2 capitalize">{task.category}</td>

          <td className="px-2 py-2">
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                priorityColor[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </td>

          <td className="px-4 py-3">
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                statusColor[task.status]
              }`}
            >
              {task.status}
            </span>
          </td>

          {isAdmin && <td className="px-4 py-3">{task.userId.name}</td>}

          {isAdmin && <td className="px-4 py-3">{task.userId.email}</td>}

          <td className="px-1 py-3 flex gap-3">
            <button onClick={() => navigate(`/task/details/${task._id}`)}>
              <EyeIcon className="w-5 h-5 text-sky-900" />
            </button>

            <button onClick={() => handleDelete(task._id)}>
              <TrashIcon className="w-5 h-5 text-red-600" />
            </button>
          </td>
        </tr>
      )),
    [tasks, page]
  );

  /* ---------- UI ---------- */
  if (isError) {
    return (
      <p className="text-center text-red-600">
        Failed to load tasks. Please try again.
      </p>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 h-[calc(100vh-120px)]">
      {/* <div className="bg-gray-50 p-6"> */}
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <input
            placeholder="Search tasks..."
            className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select
            className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="shopping">Shopping</option>
            <option value="urgent">Urgent</option>
          </select>

          <select
            className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {isAdmin && (
            <button
              onClick={() => setOpenModal(true)}
              className="ml-auto px-4 py-2 bg-sky-900 text-white rounded-lg"
            >
              + Add Task
            </button>
          )}
        </div>

        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <AddTask onClose={() => setOpenModal(false)} onTaskCreated={() => setRefresh(prev => !prev)} />
        </Modal>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <table className="w-full text-sm pb-1 dark:text-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-700 px-2">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                {isAdmin && <th>Assigned User</th>}
                {isAdmin && <th>Email</th>}
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center">
                    Loading...
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center">
                    No tasks found
                  </td>
                </tr>
              ) : (
                rows
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
