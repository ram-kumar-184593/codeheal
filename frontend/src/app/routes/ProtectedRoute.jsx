// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";

// const ProtectedRoute = () => {
//   const { user, loading } = useAuth();

//   if (loading) return null; // wait until rehydration finishes

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // No longer blocking guest users
  return <Outlet />;
};

export default ProtectedRoute;