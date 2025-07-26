"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  QrCode, 
  Download, 
  Grid3X3,
  Printer,
  Smartphone,
  Settings
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TableQRDisplay from "@/components/TableQRDisplay";

// Función para generar QR usando QR Server API
const generateQRCode = (text) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
};

// Función para descargar imagen
const downloadImage = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function QRGallery() {
  const [startTable, setStartTable] = useState(1);
  const [endTable, setEndTable] = useState(20);
  const [restaurantName, setRestaurantName] = useState("Mario's Pizza Palace");
  const [showSettings, setShowSettings] = useState(false);

  // Generar rango de mesas
  const generateTableRange = () => {
    const tables = [];
    for (let i = parseInt(startTable); i <= parseInt(endTable); i++) {
      tables.push(i);
    }
    return tables;
  };

  const tables = generateTableRange();

  // Descargar todos los QRs
  const downloadAllQRs = () => {
    tables.forEach((tableNumber, index) => {
      setTimeout(() => {
        const baseUrl = window.location.origin;
        const chatUrlWithTable = `${baseUrl}/chat?mesa=${tableNumber}`;
        const qrUrl = generateQRCode(chatUrlWithTable);
        downloadImage(qrUrl, `qr-mesa-${tableNumber}.png`);
      }, index * 500); // Descargar cada 500ms
    });
    
    toast.success(`Descargando ${tables.length} códigos QR...`);
  };

  // Imprimir galería
  const printGallery = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Galería de QR para Mesas" subtitle="Todos los códigos QR en una vista" />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-8">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-white mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Grid3X3 className="h-8 w-8" />
                  Galería de QR para Mesas
                </h1>
                <p className="text-purple-100">
                  Vista completa de todos los códigos QR para las mesas del restaurante
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
                
                <Button
                  size="sm"
                  className="bg-white text-purple-600 hover:bg-purple-50"
                  onClick={downloadAllQRs}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Todos
                </Button>
                
                <Button
                  size="sm"
                  className="bg-white text-purple-600 hover:bg-purple-50"
                  onClick={printGallery}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Configuración */}
        {showSettings && (
          <section className="w-full bg-white border-b border-gray-200 py-6">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Configuración de la Galería</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="restaurantName" className="text-sm font-medium text-gray-700">
                      Nombre del Restaurante
                    </Label>
                    <Input
                      id="restaurantName"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="startTable" className="text-sm font-medium text-gray-700">
                      Mesa Inicial
                    </Label>
                    <Input
                      id="startTable"
                      type="number"
                      value={startTable}
                      onChange={(e) => setStartTable(e.target.value)}
                      className="mt-1"
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endTable" className="text-sm font-medium text-gray-700">
                      Mesa Final
                    </Label>
                    <Input
                      id="endTable"
                      type="number"
                      value={endTable}
                      onChange={(e) => setEndTable(e.target.value)}
                      className="mt-1"
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <p>Generando QRs para {tables.length} mesas (Mesa {startTable} - Mesa {endTable})</p>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Galería de QRs */}
        <section className="w-full py-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Códigos QR para {restaurantName}
              </h2>
              <p className="text-gray-600">
                Total: {tables.length} mesas • Mesa {startTable} - Mesa {endTable}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {tables.map((tableNumber) => (
                <div key={tableNumber} className="print:break-inside-avoid">
                  <TableQRDisplay 
                    tableNumber={tableNumber.toString()} 
                    restaurantName={restaurantName}
                  />
                </div>
              ))}
            </div>
            
            {tables.length === 0 && (
              <div className="text-center py-12">
                <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hay mesas configuradas</p>
                <p className="text-sm text-gray-400">Ajusta la configuración para generar QRs</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Estilos para impresión */}
      <style jsx>{`
        @media print {
          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          header, footer, button {
            display: none !important;
          }
          
          main {
            padding: 0 !important;
          }
          
          .grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
} 