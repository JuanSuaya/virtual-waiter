import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm({ className, ...props }) {
  const navigate = useNavigate();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Crea una cuenta para tu taller mecánico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juanperez@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full bg-primary" onClick={() => {navigate("/register-workshop")}}>
                  Regístrate
                </Button>
              </div>
              <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Inicia Sesión
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        <p>
          Al crear una cuenta aceptas nuestros{" "}
          <a href="#">Terminos y Condiciones</a> y la{" "}
          <a href="#">Politica de Privacidad</a>.
        </p>
      </div>
    </div>
  );
}
