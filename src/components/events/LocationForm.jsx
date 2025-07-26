import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InteractiveMap } from "./InteractiveMap";

export const LocationForm = ({ coordinates, onLocationSelect }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="venue">Nombre del Lugar</Label>
        <Input id="venue" placeholder="Ej: Centro de Convenciones" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" placeholder="Calle y número" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">País</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un país" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uy">Uruguay</SelectItem>
              <SelectItem value="ar">Argentina</SelectItem>
              <SelectItem value="br">Brasil</SelectItem>
              <SelectItem value="mx">México</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">Ciudad</Label>
        <Input id="city" placeholder="Montevideo" required />
      </div>

      <div className="space-y-2">
        <Label>Ubicación en el Mapa</Label>
        <InteractiveMap
          onLocationSelect={onLocationSelect}
          latitude={coordinates.lat}
          longitude={coordinates.lng}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitud</Label>
            <Input 
              id="latitude" 
              value={coordinates.lat} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitud</Label>
            <Input 
              id="longitude" 
              value={coordinates.lng} 
              readOnly 
              className="bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 