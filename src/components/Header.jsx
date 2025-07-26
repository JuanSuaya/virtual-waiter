import { Clock, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logos/waiter.png";

const Header = ({ title = "Mercado Agrícola", subtitle = "Tu mozo virtual" }) => {
  return (
    <div className="relative bg-gradient-to-r from-violet-600 via-blue-600 to-violet-700 shadow-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo y branding */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/30">
                <img src={logo} alt="Hackaton" className="h-10 w-auto drop-shadow-lg" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                {title}
              </h1>
              <p className="text-violet-100 text-sm font-medium">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Información adicional */}
          <div className="flex items-center space-x-6">
            {/* Ubicación */}
            <div className="hidden md:flex items-center space-x-2 text-white/90">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="text-sm">
                <p className="font-medium">José L. Terra 2220</p>
                <p className="text-violet-100 text-xs">Montevideo, Uruguay</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="hidden lg:flex items-center space-x-2 text-white/90">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Phone className="h-4 w-4" />
              </div>
              <div className="text-sm">
                <p className="font-medium">+598 2 400 1234</p>
                <p className="text-violet-100 text-xs">Llamanos</p>
              </div>
            </div>

            {/* Reloj */}
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30 shadow-lg">
              <Clock className="h-5 w-5 text-white" />
              <div className="text-white">
                <p className="text-sm font-semibold">
                  {new Date().toLocaleTimeString('es-UY', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
                <p className="text-violet-100 text-xs">
                  {new Date().toLocaleDateString('es-UY', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Versión móvil del título */}
        <div className="sm:hidden mt-4 text-center">
          <h1 className="text-xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
          <p className="text-violet-100 text-sm font-medium">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"></div>
    </div>
  );
};

export default Header; 