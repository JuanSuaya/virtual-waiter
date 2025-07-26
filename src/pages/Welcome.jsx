"use client";

import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import { ArrowRightCircle } from "lucide-react";
import logo from "@/assets/logos/vivento-V-white.png";

export default function Welcome() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-indigo-100/40 via-white to-white" />

        <div className="relative z-10 max-w-xl space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl font-semibold flex flex-col items-center gap-2">
              <img src={logo} alt="Logo" height={40} width={40} />
              <span>
                Verifi<span className="text-secondary">car</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold mt-2">¡Bienvenido!</h1>
          </div>

          {/* Descripción */}
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="text-primary font-medium">Tu taller, tu control.</p>
            <p>
              Con <strong>Vivento</strong>, simplifica la gestión de tu
              negocio automotriz con herramientas diseñadas para optimizar tu
              trabajo.
            </p>
            <p>
              Crea órdenes de trabajo, administra tu inventario, lleva un
              control financiero preciso y mucho más, todo en un solo lugar.
            </p>
            <p className="text-primary font-semibold">
              ¡Empieza ahora y lleva tu taller al siguiente nivel!
            </p>
          </div>

          {/* Botón */}
          <Button className="px-6 py-2 rounded-full text-base font-medium hover:bg-primary-hover">
            <ArrowRightCircle className="mr-2 h-5 w-5" />
            Ver tutoriales
          </Button>

          {/* Footer */}
          <div className="text-xs text-muted-foreground pt-10 space-y-2">
            <p>© 2025 Vivento. Todos los derechos reservados.</p>
            <p>
              Este sitio está protegido por reCAPTCHA y aplican tanto la{" "}
              <a href="#" className="underline">
                política de privacidad
              </a>{" "}
              como los{" "}
              <a href="#" className="underline">
                términos de servicio
              </a>{" "}
              de Google.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
