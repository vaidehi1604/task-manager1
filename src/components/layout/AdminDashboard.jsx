import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { api } from "../../api/apiInterceptors";

const COLORS = ["#0ea5e9", "#38bdf8", "#0284c7", "#7dd3fc", "#0369a1"];
const STATUS_COLORS = {
  completed: "#22C55E", // green-500 (success)
  pending: "#0EA5E9",   // sky-500 (primary)
  inprogress: "#F59E0B", // amber-500 (warning)
  cancelled: "#EF4444", // red-500 (danger)
};

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api({
        endpoint: "/task/admin/dashboard",
        method: "GET",
        showToast: false,
      });
      setData(res.dashboard);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950 text-gray-600 dark:text-slate-400">
        Loading dashboard…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950 text-red-500">
        Failed to load dashboard data
      </div>
    );
  }

  const { totals, breakdowns, recentTasks } = data;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-slate-100">

      {/* HEADER */}
      {/* <div className="px-8 py-6 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-400">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">
          Overview & analytics
        </p>
      </div> */}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        <StatCard title="Total Tasks" value={totals.tasks} />
        <StatCard title="Total Users" value={totals.users} />
        <StatCard
          title="Completed"
          value={
            breakdowns.byStatus.find(s => s._id === "completed")?.count || 0
          }
        />
        <StatCard
          title="High Priority"
          value={
            breakdowns.byPriority.find(p => p._id === "high")?.count || 0
          }
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8">
        <ChartCard title="Tasks by Status">
  <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie
        data={breakdowns.byStatus}
        dataKey="count"
        innerRadius={65}
        outerRadius={100}
        paddingAngle={2}
      >
        {breakdowns.byStatus.map((item, i) => (
          <Cell
            key={i}
            fill={STATUS_COLORS[item._id] || "#94A3B8"} // slate-400 fallback
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>

  {/* LEGEND */}
  <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
    {breakdowns.byStatus.map((item) => (
      <div key={item._id} className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: STATUS_COLORS[item._id] }}
        />
        <span className="capitalize text-gray-600 dark:text-gray-300">
          {item._id}
        </span>
      </div>
    ))}
  </div>
</ChartCard>

        {/* <ChartCard title="Tasks by Status">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={breakdowns.byStatus}
                dataKey="count"
                innerRadius={65}
                outerRadius={100}
              >
                {breakdowns.byStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard> */}

        <ChartCard title="Tasks by Priority">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={breakdowns.byPriority}>
              <XAxis dataKey="_id" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#0ea5e9"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* RECENT TASKS */}
      <div className="p-8">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-xl">
          <h2 className="text-lg font-semibold px-6 py-4 border-b border-gray-200 dark:border-slate-800 text-sky-700 dark:text-sky-400">
            Recent Tasks
          </h2>

          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-center">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map(task => (
                <tr
                  key={task._id}
                  className="border-t border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition text-center"
                >
                  <td className="px-6 py-3">{task.title}</td>
                  <td className="capitalize">{task.status}</td>
                  <td className="capitalize text-sky-600 dark:text-sky-400">
                    {task.priority}
                  </td>
                  <td className="text-gray-500 dark:text-slate-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

/* COMPONENTS */

const StatCard = ({ title, value }) => (
  <div className="
    bg-white dark:bg-slate-900
    border border-gray-200 dark:border-slate-800
    rounded-xl p-6
    shadow-sm dark:shadow-lg
    hover:shadow-md dark:hover:shadow-sky-500/10
    transition
  ">
    <p className="text-gray-500 dark:text-slate-400 text-sm">{title}</p>
    <p className="text-3xl font-bold text-sky-600 dark:text-sky-500 mt-2">
      {value}
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="
    bg-white dark:bg-slate-900
    border border-gray-200 dark:border-slate-800
    rounded-xl p-6
    shadow-sm dark:shadow-lg
  ">
    <h3 className="font-semibold text-gray-700 dark:text-slate-300 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

export default AdminDashboard;
