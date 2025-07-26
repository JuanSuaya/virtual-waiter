import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userLogIn } from "@/api/register-login"
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logos/waiter.png";

function sanitizeInput(str) {
  // Elimina espacios al inicio/final y caracteres de control
  return str.replace(/[<>"'`]/g, "").trim();
}

function isValidEmail(email) {
  // Validación básica de email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LoginForm({ className, ...props }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const startLoading = useAppStore.getState().startLoading;
  const stopLoading = useAppStore.getState().stopLoading;
  const { login } = useAuth();

  // Bypass para desarrollo (NO usar en producción)
  const bypassUser = "admin@admin.com";
  const bypassPass = "1234";

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();
    const cleanUser = sanitizeInput(username);
    const cleanPass = sanitizeInput(password);
    if (!isValidEmail(cleanUser)) {
      toast.error("Ingresa un correo electrónico válido");
      stopLoading();
      return;
    }
    try {
      if (cleanUser === bypassUser && cleanPass === bypassPass) {
        login({ username: bypassUser });
        toast.success("Sesión iniciada con acceso rápido");
        navigate("/kitchen");
        return;
      }
      await userLogIn(cleanUser, cleanPass);
      toast.success("Sesión iniciada correctamente");
      login({ email: cleanUser });
      navigate("/kitchen");
    } catch (error) {
      toast.error(error.message);
      console.error("Login error:", error.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-violet-100 via-white to-pink-100", className)} {...props}>
      <div className="w-full max-w-md mx-auto flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-pink-400 shadow-lg mb-2">
            <img src={logo} alt="Logo" height={36} width={36} />
          </div>
          <span className="text-2xl font-extrabold text-violet-700 tracking-tight drop-shadow-sm">Hackaton</span>
        </div>
        <Card className="bg-white/90 rounded-3xl shadow-2xl border-0 px-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-violet-700 font-extrabold">Inicia sesión en tu cuenta</CardTitle>
            <CardDescription className="text-violet-400">
              Ingresa tus credenciales para acceder al sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username" className="text-violet-700">Correo electrónico</Label>
                    <Input
                      id="username"
                      type="email"
                      placeholder="juanperez@gmail.com"
                      required
                      value={username}
                      onChange={(e) => setUsername(sanitizeInput(e.target.value).slice(0, 60))}
                      className="focus:border-violet-500 focus:ring-violet-400/40"
                      maxLength={60}
                      autoComplete="username"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="text-violet-700">Contraseña</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline text-violet-500 hover:text-pink-500"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(sanitizeInput(e.target.value).slice(0, 60))}
                      className="focus:border-violet-500 focus:ring-violet-400/40"
                      maxLength={60}
                      autoComplete="new-password"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-xl py-2 mt-2 shadow hover:from-violet-700 hover:to-pink-600 transition-all">
                    Iniciar Sesión
                  </Button>
                </div>
                <div className="text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <a href="#" className="underline underline-offset-4 text-violet-600 hover:text-pink-500" onClick={() => {toast.error("Esta funcionalidad no está disponible en este momento")}}>
                    Regístrate
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-violet-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-pink-500">
          <p>
            Al iniciar sesión aceptas nuestros{" "}
            <a href="#">Términos y Condiciones</a> y la{" "}
            <a href="#">Política de Privacidad</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
