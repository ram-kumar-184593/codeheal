import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "@/hooks/useToast";

const API = "http://localhost:5000/api/auth";

export function useAuth() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // ✅ start as true
  const [user, setUser] = useState(null);

  // 🔹 Rehydrate auth on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false); // ✅ only after checking storage
  }, []);

  const signUp = async (email, password, displayName) => {
    setLoading(true);
    try {
      await axios.post(`${API}/register`, {
        name: displayName,
        email,
        password,
      });

      const loginRes = await axios.post(`${API}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));

      setUser(loginRes.data.user);

      navigate("/app");
    } catch (err) {
      toast({
        title: "Signup failed",
        description:
          err.response?.data?.error || err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      navigate("/app");
    } catch (err) {
      toast({
        title: "Login failed",
        description:
          err.response?.data?.error || err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (credential) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/google`, {
        credential,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      navigate("/app");
    } catch (err) {
      toast({
        title: "Google login failed",
        description:
          err.response?.data?.error ||
          err.message ||
          "Google authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return {
    loading,
    user,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };
}