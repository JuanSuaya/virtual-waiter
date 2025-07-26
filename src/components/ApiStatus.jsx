import { useState, useEffect } from "react";
import { Wifi, WifiOff, AlertCircle } from "lucide-react";
import { checkApiHealth } from "@/api/chat";

const ApiStatus = () => {
  const [status, setStatus] = useState("checking"); // checking, online, offline, error
  const [lastCheck, setLastCheck] = useState(null);

  const checkApiStatus = async () => {
    try {
      setStatus("checking");
      await checkApiHealth();
      setStatus("online");
    } catch (error) {
      setStatus("offline");
    } finally {
      setLastCheck(new Date());
    }
  };

  useEffect(() => {
    checkApiStatus();
    
    // Verificar cada 30 segundos
    const interval = setInterval(checkApiStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case "online":
        return {
          icon: Wifi,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          text: "Mozo virtual conectado",
          description: "Listo para recibir pedidos"
        };
      case "offline":
        return {
          icon: WifiOff,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          text: "Mozo virtual desconectado",
          description: "Verificando conexión..."
        };
      case "error":
        return {
          icon: AlertCircle,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          text: "Error de conexión",
          description: "Reintentando..."
        };
      default:
        return {
          icon: Wifi,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          text: "Verificando conexión...",
          description: "Conectando con el mozo virtual"
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className={`px-4 py-2 ${config.bgColor} border ${config.borderColor} rounded-lg`}>
      <div className="flex items-center space-x-2">
        <IconComponent className={`h-4 w-4 ${config.color}`} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${config.color}`}>
            {config.text}
          </p>
          <p className="text-xs text-gray-600">
            {config.description}
          </p>
        </div>
        {lastCheck && (
          <button
            onClick={checkApiStatus}
            className="text-xs text-gray-500 hover:text-gray-700"
            title="Última verificación"
          >
            {lastCheck.toLocaleTimeString('es-UY', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </button>
        )}
      </div>
    </div>
  );
};

export default ApiStatus; 