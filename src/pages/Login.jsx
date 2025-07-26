import logo from "@/assets/logos/waiter.png"
import { LoginForm } from "../components/login-form"
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/", { replace: true });
  //   }
  // }, [user, navigate]);

  return (
    <LoginForm />
  )
}
