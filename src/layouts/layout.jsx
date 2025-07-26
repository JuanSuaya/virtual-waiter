import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useBreadcrumbStore } from "@/store/breadcrumbStore";
import { Button } from "@/components/ui/button";
// import EventLogo from "@/assets/logos/vivento-V-white.png";
import EventLogo from "@/assets/logos/waiter.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";


export default function Layout({ children, hasBackground }) {
  const { breadcrumbs } = useBreadcrumbStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full h-16 
  bg-gradient-to-r from-violet-500 via-indigo-400 to-pink-400 
  shadow-md z-50 flex items-center justify-between px-6 
  backdrop-blur-md bg-opacity-80 border-b border-white/10 transition-all">

        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={EventLogo} alt="Event Logo" className="w-12 h-12" />
            <span className="text-white text-xl font-extrabold tracking-tight drop-shadow-sm">
              Vivento
            </span>
          </Link>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <Button
              className="bg-white text-violet-700 font-semibold px-5 py-2 rounded-full shadow hover:bg-violet-100 transition-all cursor-pointer"
              onClick={() => navigate("/create-event")}
            >
              Crear evento
            </Button>
            <Button
              asChild
              className="bg-orange-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-orange-600 transition-all cursor-pointer"
            >
              <Link to="/kitchen">Cocina</Link>
            </Button>
            <Button
              asChild
              className="bg-green-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-green-600 transition-all cursor-pointer"
            >
              <Link to="/qr-generator">QR Mesas</Link>
            </Button>
            <Button
              asChild
              className="bg-purple-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-purple-600 transition-all cursor-pointer"
            >
              <Link to="/qr-gallery">Galería QR</Link>
            </Button>
            <span className="text-white/90 font-medium text-base hidden sm:block">{user.email}</span>
            <Button
              variant="outline"
              className="bg-white/80 text-violet-700 font-semibold px-5 py-2 rounded-full shadow hover:bg-violet-100 transition-all cursor-pointer"
              onClick={() => { logout(); navigate("/login"); }}
            >
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <Button asChild className="bg-white text-violet-700 font-semibold px-5 py-2 rounded-full shadow hover:bg-violet-100 transition-all cursor-pointer">
            <Link to="/login">Iniciar sesión</Link>
          </Button>
        )}
      </nav>

      <SidebarInset className="flex flex-col min-h-screen pt-16">
        {children}
      </SidebarInset>

      <footer className="w-full py-8 bg-gradient-to-r from-violet-700 to-blue-600 text-white text-center text-sm animate-fade-in-up">
        <div>© 2025 TicketApp. Todos los derechos reservados.</div>
        <div className="mt-1 text-violet-200">
          Inspirado en las mejores experiencias de ticketing. <a href="#" className="underline hover:text-yellow-300">Política de privacidad</a> · <a href="#" className="underline hover:text-yellow-300">Términos de servicio</a>
        </div>
      </footer>

    </div>
  );
}
