import { useState } from "react";
import { toast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import LoginCard from "@/components/auth/LoginCard";

export default function Login() {
  const { signUp, signIn, signInWithGoogle, loading } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // EMAIL LOGIN / SIGNUP
  const handleSubmit = async () => {
    if (!email || !password || (isSignUp && !name)) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });

      return;
    }

    try {
      if (isSignUp) await signUp(email, password, name);
      else await signIn(email, password);
    } catch (err) {
      toast({
        title: "Authentication failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // GOOGLE LOGIN SUCCESS
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await signInWithGoogle(credentialResponse.credential);
    } catch (err) {
      toast({
        title: "Google login failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // GOOGLE LOGIN ERROR
  const handleGoogleError = () => {
    toast({
      title: "Google login failed",
      description: "Unable to authenticate with Google.",
      variant: "destructive",
    });
  };

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-[#0f172a]
        via-[#111827]
        to-[#020617]
        text-white
        px-4
      "
    >
      <LoginCard
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        handleGoogleSuccess={handleGoogleSuccess}
        handleGoogleError={handleGoogleError}
      />
    </div>
  );
}
