import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, CheckCircle, XCircle, RotateCcw, AlertTriangle, MapPin } from "lucide-react";

// Estados de los pedidos
const ORDER_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
  CANCELLED: 'cancelled'
};

// Configuración de estados
const STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: {
    label: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    bgColor: 'bg-yellow-50 border-yellow-200'
  },
  [ORDER_STATUS.IN_PROGRESS]: {
    label: 'En Preparación',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    bgColor: 'bg-blue-50 border-blue-200'
  },
  [ORDER_STATUS.DONE]: {
    label: 'Listo',
    color: 'bg-green-100 text-green-800 border-green-200',
    bgColor: 'bg-green-50 border-green-200'
  },
  [ORDER_STATUS.CANCELLED]: {
    label: 'Cancelado',
    color: 'bg-red-100 text-red-800 border-red-200',
    bgColor: 'bg-red-50 border-red-200'
  }
};

export default function OrderCard({ 
  order, 
  onUpdateStatus, 
  onRemove, 
  showSpecialInstructions = true 
}) {
  // Función para formatear tiempo
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Función para calcular tiempo transcurrido
  const getTimeElapsed = (dateString) => {
    const now = new Date();
    const orderTime = new Date(dateString);
    const diffMs = now - orderTime;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `${diffMins} min`;
    
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}min`;
  };

  // Obtener instrucciones especiales
  const getSpecialInstructions = () => {
    const instructions = [];
    
    if (order.notes) {
      instructions.push({ type: 'note', text: order.notes });
    }
    
    order.order_items?.forEach(item => {
      if (item.special_instructions) {
        instructions.push({ 
          type: 'item', 
          text: `${item.menu_item_name || `Item ${item.menu_item}`}: ${item.special_instructions}` 
        });
      }
    });
    
    return instructions;
  };

  const specialInstructions = getSpecialInstructions();
  const statusConfig = STATUS_CONFIG[order.status];

  return (
    <Card className={`p-4 ${statusConfig.bgColor} hover:shadow-lg transition-all flex flex-col h-full`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-800">Pedido #{order.id}</h3>
          <p className="text-sm text-gray-600">{order.customer_name}</p>
        </div>
        <Badge className={statusConfig.color}>
          {statusConfig.label}
        </Badge>
      </div>
      {/* Mostrar número de mesa con icono de locación si existe */}
      {order.table_number && (
        <div className="mb-2">
          <span className="inline-flex items-center text-xs font-semibold text-white bg-blue-500 rounded px-2 py-1">
            <MapPin className="h-4 w-4 mr-1 text-white" />
            Mesa {order.table_number}
          </span>
        </div>
      )}
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-2">
          <Clock className="h-3 w-3 inline mr-1" />
          {formatTime(order.created_at)} • {getTimeElapsed(order.created_at)}
        </p>
        
        {order.notes && (
          <p className="text-sm text-gray-700 bg-yellow-100 p-2 rounded">
            <strong>Nota:</strong> {order.notes}
          </p>
        )}
      </div>
      
      {/* Instrucciones especiales */}
      {showSpecialInstructions && specialInstructions.length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Instrucciones Especiales:
          </h4>
          <div className="space-y-1">
            {specialInstructions.map((instruction, index) => (
              <div key={index} className="text-sm bg-orange-50 p-2 rounded border-l-2 border-orange-300">
                <span className="text-orange-700">{instruction.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex-1">
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Items:</h4>
          <div className="space-y-1">
            {order.order_items?.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.quantity}x {item.menu_item_name || `Item ${item.menu_item}`}
                </span>
                <span className="text-gray-500">${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Botones de acción según el estado - siempre al final */}
      <div className="mt-auto pt-3">
      {order.status === ORDER_STATUS.PENDING && (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => onUpdateStatus(order.id, ORDER_STATUS.IN_PROGRESS)}
          >
            <Play className="h-4 w-4 mr-1" />
            Iniciar
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => onUpdateStatus(order.id, ORDER_STATUS.CANCELLED)}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {order.status === ORDER_STATUS.IN_PROGRESS && (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => onUpdateStatus(order.id, ORDER_STATUS.DONE)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Listo
          </Button>
        </div>
      )}
      
      {order.status === ORDER_STATUS.DONE && (
        <Button
          size="sm"
          className="w-full bg-red-600 hover:bg-red-700"
          onClick={() => onRemove(order.id)}
        >
          <XCircle className="h-4 w-4 mr-1" />
          Remover Pedido
        </Button>
      )}
      </div>
    </Card>
  );
} 