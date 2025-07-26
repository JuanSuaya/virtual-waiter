// import logo from "@/assets/logos/favicon-white.svg"
// import { RegisterForm } from "../components/register-form"

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/admin-events", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-violet-700">Registro</h1>
        {/* Aquí va el formulario real de registro */}
        <p className="text-gray-500">Funcionalidad no disponible en este momento.</p>
      </div>
    </div>
  );
}
