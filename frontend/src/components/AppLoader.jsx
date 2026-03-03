import { motion } from "framer-motion";

export function AppLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120]">
      <div className="flex flex-col items-center gap-6">

        {/* Animated Logo Circle */}
        <motion.div
          className="relative h-20 w-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <span className="text-white text-2xl font-bold">⚡</span>

          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 blur-xl opacity-40" />
        </motion.div>

        {/* Animated Text */}
        <motion.p
          className="text-white/70 text-sm tracking-wide"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            repeatType: "reverse",
          }}
        >
          Loading CodeHeal...
        </motion.p>
      </div>
    </div>
  );
}