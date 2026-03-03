import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Zap, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div
      className="
      min-h-screen
      flex items-center justify-center
      px-4
      relative overflow-hidden
      bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]
      text-white
    "
    >
      {/* Background glow */}
      <div
        className="
        absolute inset-0
        bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_50%)]
        pointer-events-none
      "
      />

      {/* Card */}
      <div
        className="
        relative z-10
        text-center
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-10
        shadow-2xl
        max-w-md w-full
      "
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div
            className="
            h-8 w-8 rounded-lg
            bg-gradient-to-tr from-indigo-500 to-purple-500
            flex items-center justify-center
          "
          >
            <Zap className="h-4 w-4 text-white" />
          </div>

          <span className="font-semibold text-lg">
            Code
            <span
              className="
              bg-gradient-to-r from-indigo-400 to-purple-400
              bg-clip-text text-transparent
            "
            >
              Heal
            </span>
          </span>
        </div>

        {/* 404 */}
        <h1
          className="
          text-6xl font-bold mb-4
          bg-gradient-to-r from-indigo-400 to-purple-400
          bg-clip-text text-transparent
        "
        >
          404
        </h1>

        <p className="mb-6 text-white/60 text-lg">Oops! Page not found</p>

        {/* Button */}
        <Link
          to="/"
          className="
            inline-flex items-center gap-2
            px-5 py-2.5
            rounded-lg
            bg-gradient-to-r from-indigo-500 to-purple-500
            hover:opacity-90
            transition
            shadow-lg
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
