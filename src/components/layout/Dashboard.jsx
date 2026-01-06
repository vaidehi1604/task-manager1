import React, { useState } from "react";
import TaskList from "../features/task/TaskList";
import {
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  UserIcon,
  UsersIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "../common/ThemeToggle";
import { userApiEndpoints } from "../../constants/api-endpoints/user/user";
import { api } from "../../api/apiInterceptors";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import AdminDashboard from "./AdminDashboard";
import ChangePassword from "../../../src/components/features/profile/ChangePassword.jsx";
import { USER_ACCESS_TOKEN_KEY } from "../../appConstants.js";

const Dashboard = ({ active = "dashboard" }) => {
  const { user, logout, isAdmin } = useAuth();
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [activeView, setActiveView] = useState(
    active === "dashboard" && isAdmin ? "dashboard" : "tasks"
  );
  const handleLogout = async () => {
    try {
      await api({
        endpoint: userApiEndpoints.ENDPOINTS_USER_LOGOUT,
        method: "POST",
      });
      logout();
      localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Force logout even if API fails
      logout();
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white flex relative">
      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* ---------- Top Navbar ---------- */}
        <header className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          {/* <img
            src={logo}
            alt="logo"
            className="w-15 cursor-pointer rounded-full m-2"
          /> */}
          <div className="leading-tight select-none">
            <button
              onClick={() => {
                isAdmin ? (navigate("/dashboard") && setActiveView("dashboard")): navigate("/dashboard/tasks") && setActiveView("tasks");
                
              }}
            >
              <span className="block text-m font-bold text-sky-700 dark:text-sky-400">
                Task
              </span>
              <span className="block pl-3 text-m font-bold text-slate-900 dark:text-slate-100">
                Manager
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Profile */}
            <Cog6ToothIcon
              className="w-10 h-10 cursor-pointer text-sky-900 p-2 border-2 border-sky-900 rounded-full"
              onClick={() => setOpenProfile(true)}
            />
            {/* <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-sky-900"
              onClick={() => setOpenProfile(true)}
            /> */}
          </div>
        </header>

        {/* ---------- Dashboard Content ---------- */}
        <main className="p-6">
          {activeView === "dashboard" && isAdmin && <AdminDashboard />}
          {activeView === "tasks" && <TaskList />}
        </main>
      </div>

      {/* ================= BACKDROP ================= */}
      {openProfile && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpenProfile(false)}
        />
      )}

      {/* ================= PROFILE SIDEBAR ================= */}
      {/* ================= PROFILE SIDEBAR ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-sky-900 text-white z-50
  transform transition-transform duration-300 ease-in-out
  ${openProfile ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* 🔹 HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-sky-700">
            <h2 className="text-lg font-semibold">Profile</h2>
            <button onClick={() => setOpenProfile(false)}>
              <XMarkIcon className="w-6 h-6 hover:text-sky-300" />
            </button>
          </div>

          {/* 🔹 USER INFO */}
          <div className="flex items-center gap-4 px-5 py-6 border-b border-sky-700">
            <UserCircleIcon className="w-12 h-12 text-white" />
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-sky-200">{user?.email}</p>
            </div>
          </div>

          {/* 🔹 MENU (SCROLLABLE ONLY IF NEEDED) */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {isAdmin && (
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setActiveView("dashboard");
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition
            ${activeView === "dashboard" ? "bg-sky-800" : "hover:bg-sky-800"}
          `}
              >
                <UserIcon className="w-5 h-5" />
                Dashboard
              </button>
            )}

            <button
              onClick={() => {
                navigate("/dashboard/tasks");
                setActiveView("tasks");
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition
          ${activeView === "tasks" ? "bg-sky-800" : "hover:bg-sky-800"}
        `}
            >
              <UsersIcon className="w-5 h-5" />
              Task List
            </button>

            <button
              onClick={() => setOpenChangePassword(true)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-sky-800 transition"
            >
              <LockClosedIcon className="w-5 h-5" />
              Change Password
            </button>
          </div>

          {/* 🔹 LOGOUT (FIXED AT BOTTOM) */}
          <div className="px-3 py-4 border-t border-sky-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
        hover:bg-white hover:text-sky-800 transition"
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MODALS (BOTTOM) */}
      <ChangePassword
        isOpen={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
    </div>
  );
};

export default Dashboard;
