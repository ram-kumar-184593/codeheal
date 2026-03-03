// import { Link } from "react-router-dom";
// import { Zap, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function LoginCard({
//   isSignUp,
//   setIsSignUp,
//   name,
//   setName,
//   email,
//   setEmail,
//   password,
//   setPassword,
//   showPassword,
//   setShowPassword,
//   loading,
//   handleSubmit
// }) {

//   return (

//     <div className="w-full max-w-md space-y-6 bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-2xl">

//       {/* Header */}
//       <div className="flex items-center justify-between">

//         <Link to="/" className="text-white/60">
//           <ArrowLeft className="h-4 w-4" />
//         </Link>

//         <div className="flex items-center gap-2">

//           <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
//             <Zap className="h-4 w-4 text-white" />
//           </div>

//           <span className="font-semibold text-lg">
//             CodeHeal
//           </span>

//         </div>

//       </div>

//       {/* Title */}
//       <div>

//         <h2 className="text-2xl font-bold">
//           {isSignUp ? "Create Account" : "Sign In"}
//         </h2>

//         <p className="text-sm text-white/60">
//           {isSignUp
//             ? "Create a new account to get started."
//             : "Enter your credentials to continue."
//           }
//         </p>

//       </div>

//       {/* Form */}
//       <div className="space-y-4">

//         {isSignUp && (
//           <div>
//             <Label>Name</Label>
//             <Input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Your name"
//             />
//           </div>
//         )}

//         <div>
//           <Label>Email</Label>
//           <Input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//           />
//         </div>

//         <div>

//           <Label>Password</Label>

//           <div className="relative">

//             <Input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="********"
//             />

//             <button
//               type="button"
//               className="absolute right-2 top-2 text-white/60"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword
//                 ? <EyeOff size={16} />
//                 : <Eye size={16} />
//               }
//             </button>

//           </div>

//         </div>

//         {/* Button */}
//         <Button
//           className="w-full bg-gradient-to-r from-indigo-500 to-purple-500"
//           onClick={handleSubmit}
//           disabled={loading}
//         >

//           {loading
//             ? <Loader2 className="h-4 w-4 animate-spin" />
//             : isSignUp ? "Sign Up" : "Sign In"
//           }

//         </Button>

//         {/* Toggle */}
//         <p className="text-sm text-center text-white/60">

//           {isSignUp
//             ? "Already have an account?"
//             : "Don't have an account?"
//           }

//           {" "}

//           <button
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="text-indigo-400 underline"
//           >
//             {isSignUp ? "Sign In" : "Sign Up"}
//           </button>

//         </p>

//       </div>

//     </div>

//   );

// }
import { Link } from "react-router-dom";
import { Zap, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { GoogleLogin } from "@react-oauth/google";

export default function LoginCard({
  isSignUp,
  setIsSignUp,

  name,
  setName,

  email,
  setEmail,

  password,
  setPassword,

  showPassword,
  setShowPassword,

  loading,

  handleSubmit,

  handleGoogleSuccess,
  handleGoogleError,
}) {
  return (
    <div
      className="
        w-full max-w-md
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-8
        shadow-[0_0_40px_rgba(99,102,241,0.15)]
        space-y-6
        relative
        overflow-hidden
      "
    >
      {/* subtle glow */}
      <div
        className="
        absolute inset-0
        bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.12),transparent_40%)]
        pointer-events-none
      "
      />

      {/* HEADER */}
      <div className="flex items-center justify-between relative z-10">
        <Link to="/" className="text-white/60 hover:text-white transition">
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="flex items-center gap-2">
          <div
            className="
              h-8 w-8
              rounded-lg
              bg-gradient-to-tr
              from-indigo-500
              to-purple-500
              flex items-center justify-center
              shadow-lg
            "
          >
            <Zap className="h-4 w-4 text-white" />
          </div>

          <span className="font-semibold text-lg text-white">
            Code
            <span
              className="
              bg-gradient-to-r
              from-indigo-400
              to-purple-400
              bg-clip-text
              text-transparent
            "
            >
              Heal
            </span>
          </span>
        </div>
      </div>

      {/* TITLE */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>

        <p className="text-sm text-white/60">
          {isSignUp
            ? "Create a new account to get started."
            : "Enter your credentials to continue."}
        </p>
      </div>

      {/* FORM */}
      <div className="space-y-4 relative z-10">
        {/* NAME */}
        {isSignUp && (
          <div>
            <Label className="text-white/70">Name</Label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="
                bg-white/5
                border-white/10
                text-white
                placeholder:text-white/40
                focus-visible:ring-indigo-500/50
              "
            />
          </div>
        )}

        {/* EMAIL */}
        <div>
          <Label className="text-white/70">Email</Label>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="
              bg-white/5
              border-white/10
              text-white
              placeholder:text-white/40
              focus-visible:ring-indigo-500/50
            "
          />
        </div>

        {/* PASSWORD */}
        <div>
          <Label className="text-white/70">Password</Label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="
                bg-white/5
                border-white/10
                text-white
                placeholder:text-white/40
                focus-visible:ring-indigo-500/50
              "
            />

            <button
              type="button"
              className="
                absolute right-2 top-2
                text-white/50 hover:text-white
                transition
              "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          className="
            w-full
            bg-gradient-to-r
            from-indigo-500
            to-purple-500
            hover:opacity-90
            shadow-lg shadow-indigo-500/20
          "
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isSignUp ? (
            "Sign Up"
          ) : (
            "Sign In"
          )}
        </Button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-white/10" />

          <span className="text-xs text-white/40">OR CONTINUE WITH</span>

          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* GOOGLE LOGIN — ULTRA PREMIUM CODEHEAL BUTTON */}

        <div className="pt-3">
          {/* Hidden real Google button */}
          <div className="hidden">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              document
                .querySelector('[role="button"][aria-labelledby]')
                .click();
            }}
            className="
      relative
      w-full
      group
      overflow-hidden
      rounded-xl
      p-[1px]
      transition-all duration-300
      disabled:opacity-50
    "
          >
            {/* Animated gradient border */}
            <div
              className="
      absolute inset-0
      bg-gradient-to-r
      from-indigo-500/40
      via-purple-500/40
      to-indigo-500/40
      opacity-0
      group-hover:opacity-100
      transition-opacity duration-500
      blur-sm
    "
            />

            {/* Shine animation */}
            <div
              className="
      absolute inset-0
      opacity-0
      group-hover:opacity-100
      transition duration-700
    "
            >
              <div
                className="
        absolute
        -left-full
        top-0
        h-full
        w-1/3
        bg-gradient-to-r
        from-transparent
        via-white/20
        to-transparent
        skew-x-12
        group-hover:left-full
        transition-all duration-1000
      "
              />
            </div>

            {/* Button content */}
            <div
              className="
      relative
      flex items-center justify-center gap-3
      rounded-xl
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      py-3
      text-white/90
      group-hover:bg-white/10
      group-hover:border-indigo-400/40
      transition-all duration-300
      shadow-lg
      group-hover:shadow-indigo-500/20
    "
            >
              {/* Google icon */}
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.88-6.88C35.94 2.2 30.36 0 24 0 14.64 0 6.4 5.4 2.4 13.2l8.16 6.34C12.54 13.14 17.8 9.5 24 9.5z"
                />

                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.64-.14-3.22-.4-4.74H24v9h12.64c-.54 2.9-2.18 5.36-4.64 7.02l7.2 5.6C43.86 37.14 46.5 31.34 46.5 24.5z"
                />

                <path
                  fill="#FBBC05"
                  d="M10.56 28.54a14.5 14.5 0 0 1 0-9.08L2.4 13.2A24 24 0 0 0 0 24c0 3.86.92 7.52 2.4 10.8l8.16-6.26z"
                />

                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.94-2.14 15.92-5.82l-7.2-5.6c-2.02 1.36-4.6 2.18-8.72 2.18-6.2 0-11.46-3.64-13.44-9.04L2.4 34.8C6.4 42.6 14.64 48 24 48z"
                />
              </svg>

              {/* Text */}
              <span className="font-medium tracking-wide">
                {loading ? "Connecting..." : "Continue with Google"}
              </span>
            </div>
          </button>
        </div>
        {/* SWITCH BETWEEN SIGN IN / SIGN UP */}

        <p className="text-sm text-center text-white/60 pt-2">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="
      text-indigo-400
      hover:text-indigo-300
      underline
      transition
    "
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
