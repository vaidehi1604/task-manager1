import React, { useState } from "react";
import TaskList from "../features/task/TaskList";
import {
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "../common/ThemeToggle";
import { userApiEndpoints } from "../../constants/api-endpoints/user/user";
import { api } from "../../api/apiInterceptors";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await api({
        endpoint: userApiEndpoints.ENDPOINTS_USER_LOGOUT,
        method: "POST",
      });
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Force logout even if API fails
      logout();
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white flex relative">
      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* ---------- Top Navbar ---------- */}
        <header className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <img
            src="/src/assets/task-magment.png"
            alt="logo"
            className="w-15 cursor-pointer rounded-full m-2"
          />

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
          <TaskList />
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
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-sky-900 text-white z-50
        transform transition-transform duration-300 ease-in-out
        ${openProfile ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-sky-700">
            <h2 className="text-lg font-semibold">Profile</h2>
            <button onClick={() => setOpenProfile(false)}>
              <XMarkIcon className="w-6 h-6 hover:text-sky-300" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4 px-5 py-6 border-b border-sky-700">
            <UserCircleIcon className="w-12 h-12 text-white border-1 border-white rounded-full cursor-pointer hover:opacity-80 transition" />

            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-sky-200">{user?.email}</p>
            </div>
          </div>

          {/* Menu */}
          <div className="flex-1 px-3 py-4 space-y-2">
            <button
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
              hover:bg-sky-800 transition"
            >
              <UserIcon className="w-5 h-5" />
              My Profile
            </button>

            {/* <button
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
              hover:bg-sky-800 transition"
            >
              <Cog6ToothIcon className="w-5 h-5" />
              Settings
            </button> */}
            <button
              onClick={() => navigate("/change-password")}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-sky-800 transition"
            >
              <Cog6ToothIcon className="w-5 h-5" />
              Change Password
            </button>
          </div>

          {/* Logout */}
          <div className="px-3 py-4 border-t border-sky-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
              hover:bg-white transition hover:text-sky-800"
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
