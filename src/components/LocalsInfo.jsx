import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, MapPin, Clock, Star } from "lucide-react";

const LocalsInfo = ({ onLocalSelect }) => {
  const [selectedLocal, setSelectedLocal] = useState(null);

  const locals = [
    {
      id: 1,
      name: "La Chivitería",
      description: "Hamburguesas gourmet y chivitos tradicionales",
      specialties: ["Hamburguesa completa", "Chivito canadiense", "Papas fritas"],
      location: "Local 12",
      rating: 4.8,
      isOpen: true,
    },
    {
      id: 2,
      name: "Naturalia",
      description: "Jugos naturales y smoothies saludables",
      specialties: ["Jugo de naranja", "Smoothie de frutas", "Batido de proteínas"],
      location: "Local 8",
      rating: 4.6,
      isOpen: true,
    },
    {
      id: 3,
      name: "Pizza Express",
      description: "Pizzas artesanales y pastas frescas",
      specialties: ["Pizza margarita", "Pizza pepperoni", "Lasagna"],
      location: "Local 15",
      rating: 4.7,
      isOpen: true,
    },
    {
      id: 4,
      name: "Café Central",
      description: "Café de especialidad y pastelería",
      specialties: ["Café con leche", "Cappuccino", "Croissants"],
      location: "Local 5",
      rating: 4.5,
      isOpen: true,
    },
  ];

  const handleLocalClick = (local) => {
    setSelectedLocal(local);
    if (onLocalSelect) {
      onLocalSelect(local);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Locales disponibles
        </h3>
        <p className="text-sm text-gray-600">
          Haz clic en un local para ver sus especialidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locals.map((local) => (
          <Card
            key={local.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedLocal?.id === local.id
                ? "ring-2 ring-violet-500 bg-violet-50"
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleLocalClick(local)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    {local.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {local.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">
                    {local.rating}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{local.location}</span>
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  local.isOpen ? "text-green-600" : "text-red-600"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    local.isOpen ? "bg-green-500" : "bg-red-500"
                  }`} />
                  <span>{local.isOpen ? "Abierto" : "Cerrado"}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Utensils className="h-4 w-4 text-violet-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Especialidades:
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {local.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-block bg-violet-100 text-violet-700 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedLocal && (
        <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-blue-50 rounded-xl border border-violet-200">
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-2">
              ¿Quieres pedir de {selectedLocal.name}?
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Di algo como: "Quiero una {selectedLocal.specialties[0].toLowerCase()} de {selectedLocal.name}"
            </p>
            <Button
              size="sm"
              onClick={() => setSelectedLocal(null)}
              variant="outline"
              className="text-violet-700 border-violet-300 hover:bg-violet-100"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalsInfo; 