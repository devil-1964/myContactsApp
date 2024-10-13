import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AuthRedirect({ children }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard"); // Redirect if the user is logged in
    }
  }, [isLoggedIn, navigate]);

  return !isLoggedIn ? children : null;
}
