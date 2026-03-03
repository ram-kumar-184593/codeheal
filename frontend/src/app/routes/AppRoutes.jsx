import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";
import { AppLoader } from "@/components/AppLoader";

const Landing = lazy(() => import("@/pages/Landing"));
const Login = lazy(() => import("@/pages/Login"));
const Docs = lazy(() => import("@/pages/Docs"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Analyze = lazy(() => import("@/pages/App/Analyze"));
const Explain = lazy(() => import("@/pages/App/Explain"));
const Optimize = lazy(() => import("@/pages/App/Optimize"));
const Convert = lazy(() => import("@/pages/App/Convert"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="docs" element={<Docs />} />
        </Route>

        {/* PROTECTED ROUTES
        <Route element={<ProtectedRoute />}>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="analyze" replace />} />
            <Route path="analyze" element={<Analyze />} />
            <Route path="explain" element={<Explain />} />
            <Route path="optimize" element={<Optimize />} />
            <Route path="convert" element={<Convert />} />
          </Route>
        </Route> */}
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to="analyze" replace />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="explain" element={<Explain />} />
          <Route path="optimize" element={<Optimize />} />
          <Route path="convert" element={<Convert />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
