import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, RotateCcw } from "lucide-react";

export const InteractiveMap = ({ onLocationSelect, latitude, longitude }) => {
  const mapRef = useRef(null);
  const [selectedCoords, setSelectedCoords] = useState({ lat: latitude || -34.9011, lng: longitude || -56.1645 });

  const handleMapClick = (e) => {
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const lat = -34.9011 + (rect.height / 2 - y) * 0.0005;
    const lng = -56.1645 + (x - rect.width / 2) * 0.0008;
    
    const newCoords = {
      lat: parseFloat(lat.toFixed(6)),
      lng: parseFloat(lng.toFixed(6))
    };
    
    setSelectedCoords(newCoords);
    onLocationSelect(newCoords);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: parseFloat(position.coords.latitude.toFixed(6)),
            lng: parseFloat(position.coords.longitude.toFixed(6))
          };
          setSelectedCoords(coords);
          onLocationSelect(coords);
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
        }
      );
    }
  };

  const resetLocation = () => {
    const defaultCoords = { lat: -34.9011, lng: -56.1645 };
    setSelectedCoords(defaultCoords);
    onLocationSelect(defaultCoords);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          className="flex items-center gap-2"
        >
          <Navigation className="h-4 w-4" />
          Mi Ubicación
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetLocation}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Restablecer
        </Button>
      </div>
      
      <div 
        ref={mapRef}
        className="relative h-[300px] rounded-lg border-2 border-dashed border-violet-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Simulación de mapa con grid */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-gray-300"
              style={{ top: `${i * 5}%` }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-gray-300"
              style={{ left: `${i * 5}%` }}
            />
          ))}
        </div>

        {/* Elementos decorativos del mapa */}
        <div className="absolute top-2 left-2 bg-blue-300 rounded-lg p-3 opacity-70">
          <div className="w-8 h-2 bg-blue-600 rounded mb-1"></div>
          <div className="w-6 h-1 bg-blue-500 rounded"></div>
          <div className="text-xs text-blue-800 mt-1 font-semibold">Río de la Plata</div>
        </div>
        <div className="absolute top-6 right-4 bg-amber-200 rounded p-2 opacity-80">
          <div className="w-4 h-4 bg-amber-600 rounded-sm mb-1"></div>
          <div className="text-xs text-amber-800 font-semibold">Ciudad Vieja</div>
        </div>
        <div className="absolute bottom-8 left-6 bg-green-200 rounded-full p-2">
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <div className="text-xs text-green-800 mt-1 font-semibold">Parque Rodó</div>
        </div>
        <div className="absolute top-1/3 right-8 bg-red-200 rounded p-1">
          <div className="w-5 h-2 bg-red-600 rounded"></div>
          <div className="text-xs text-red-800 font-semibold">Pocitos</div>
        </div>

        {/* Calles principales */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-500 opacity-70"></div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-500 opacity-70"></div>
        <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-500 opacity-70"></div>
        <div className="absolute left-1/5 top-0 w-1 h-full bg-gray-500 opacity-70"></div>
        <div className="absolute left-2/5 top-0 w-1 h-full bg-gray-500 opacity-70"></div>
        <div className="absolute left-3/5 top-0 w-1 h-full bg-gray-500 opacity-70"></div>
        <div className="absolute left-4/5 top-0 w-1 h-full bg-gray-500 opacity-70"></div>
        
        {/* Avenida 18 de Julio */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-yellow-400 opacity-60"></div>
        <div className="absolute top-1/2 left-1/4 bg-yellow-600 text-white text-xs px-2 py-1 rounded transform -translate-y-1/2">
          Av. 18 de Julio
        </div>

        {/* Pin de ubicación */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full z-10 animate-bounce"
          style={{
            left: `${50 + (selectedCoords.lng + 56.1645) * 1250}%`,
            top: `${50 - (selectedCoords.lat + 34.9011) * 2000}%`
          }}
        >
          <div className="relative">
            <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" fill="currentColor" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full opacity-50 animate-ping"></div>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Haz clic para seleccionar ubicación
          </p>
        </div>

        {/* Escala del mapa */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs">
          1 km
          <div className="w-8 h-px bg-black mt-1"></div>
        </div>
      </div>
    </div>
  );
}; 