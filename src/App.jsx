
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ChangePassword from "./pages/ChangePassword";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// Lazy Load Components
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./components/layout/Dashboard"));
const TaskDetails = lazy(() => import("./pages/TaskDetails"));
const NotFound = lazy(() => import("./components/common/NotFound"));

// Loading Fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 text-sky-900 font-medium animate-pulse">
    Loading...
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task/details/:taskId" element={<TaskDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
         <ToastContainer position="top-right" autoClose={3000} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
