import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAYMENT_METHODS = [
  { 
    id: "credit", 
    label: "Tarjeta de Crédito", 
    color: "bg-blue-100 text-blue-800 border-blue-200" 
  },
  { 
    id: "transfer", 
    label: "Transferencia Bancaria", 
    color: "bg-green-100 text-green-800 border-green-200" 
  },
  { 
    id: "cash", 
    label: "Efectivo", 
    color: "bg-orange-100 text-orange-800 border-orange-200" 
  },
  { 
    id: "mercadopago", 
    label: "Mercado Pago", 
    color: "bg-cyan-100 text-cyan-800 border-cyan-200" 
  }
];

export const BasicInfoForm = ({ isPublic, setIsPublic }) => {
  const [selectedPayments, setSelectedPayments] = useState([]);

  const handlePaymentSelect = (paymentId) => {
    if (!selectedPayments.includes(paymentId)) {
      setSelectedPayments([...selectedPayments, paymentId]);
    }
  };

  const removePaymentMethod = (paymentId) => {
    setSelectedPayments(selectedPayments.filter(id => id !== paymentId));
  };

  const getPaymentMethod = (id) => {
    return PAYMENT_METHODS.find(method => method.id === id);
  };

  const availablePayments = PAYMENT_METHODS.filter(
    method => !selectedPayments.includes(method.id)
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Evento</Label>
          <Input id="name" placeholder="Ej: Conferencia de Tecnología 2024" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conference">Conferencia</SelectItem>
              <SelectItem value="workshop">Taller</SelectItem>
              <SelectItem value="concert">Concierto</SelectItem>
              <SelectItem value="exhibition">Exhibición</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Fecha de Inicio</Label>
          <Input id="startDate" type="datetime-local" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Fecha de Fin</Label>
          <Input id="endDate" type="datetime-local" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="payment">Métodos de Pago</Label>
          {availablePayments.length > 0 && (
            <Select onValueChange={handlePaymentSelect} value="">
              <SelectTrigger>
                <SelectValue placeholder="Agregar método de pago" />
              </SelectTrigger>
              <SelectContent>
                {availablePayments.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {/* Chips de métodos seleccionados */}
          {selectedPayments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedPayments.map((paymentId) => {
                const method = getPaymentMethod(paymentId);
                return (
                  <div
                    key={paymentId}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${method.color}`}
                  >
                    {method.label}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removePaymentMethod(paymentId)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          {availablePayments.length === 0 && selectedPayments.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Todos los métodos de pago han sido seleccionados
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 pt-7">
          <Switch
            id="public"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
          <Label htmlFor="public">
            {isPublic ? "Evento Público" : "Evento Privado"}
          </Label>
        </div>
      </div>
    </div>
  );
};