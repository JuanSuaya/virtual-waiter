"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  QrCode, 
  Download, 
  RefreshCw, 
  Copy,
  Smartphone,
  Users,
  MapPin
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Función para generar QR usando una librería externa
const generateQRCode = (text) => {
  // Usar QR Server API para generar el QR
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
  return qrUrl;
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

// Función para copiar al portapapeles
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('URL copiada al portapapeles');
  } catch (err) {
    toast.error('Error al copiar al portapapeles');
  }
};

export default function TableQR() {
  const [tableNumber, setTableNumber] = useState("35");
  const [qrUrl, setQrUrl] = useState("");
  const [chatUrl, setChatUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Generar QR cuando cambie el número de mesa
  useEffect(() => {
    if (tableNumber) {
      const baseUrl = window.location.origin;
      const chatUrlWithTable = `${baseUrl}/chat?mesa=${tableNumber}`;
      setChatUrl(chatUrlWithTable);
      setQrUrl(generateQRCode(chatUrlWithTable));
    }
  }, [tableNumber]);

  // Generar QR manualmente
  const generateQR = () => {
    setLoading(true);
    setTimeout(() => {
      const baseUrl = window.location.origin;
      const chatUrlWithTable = `${baseUrl}/chat?mesa=${tableNumber}`;
      setChatUrl(chatUrlWithTable);
      setQrUrl(generateQRCode(chatUrlWithTable));
      setLoading(false);
      toast.success(`QR generado para Mesa ${tableNumber}`);
    }, 500);
  };

  // Descargar QR
  const handleDownload = () => {
    if (qrUrl) {
      downloadImage(qrUrl, `qr-mesa-${tableNumber}.png`);
      toast.success('QR descargado');
    }
  };

  // Copiar URL
  const handleCopyUrl = () => {
    copyToClipboard(chatUrl);
  };

  // Generar múltiples QRs para un rango de mesas
  const generateMultipleQRs = () => {
    const startTable = parseInt(tableNumber);
    const endTable = startTable + 9; // Generar 10 mesas
    
    for (let i = startTable; i <= endTable; i++) {
      setTimeout(() => {
        const baseUrl = window.location.origin;
        const chatUrlWithTable = `${baseUrl}/chat?mesa=${i}`;
        const qrUrlForTable = generateQRCode(chatUrlWithTable);
        downloadImage(qrUrlForTable, `qr-mesa-${i}.png`);
      }, (i - startTable) * 1000); // Descargar cada segundo
    }
    
    toast.success(`Descargando QRs para mesas ${startTable}-${endTable}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Generador de QR para Mesas" subtitle="Crea códigos QR para cada mesa" />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-green-600 to-blue-500 py-12">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <QrCode className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Generador de QR para Mesas
            </h1>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Crea códigos QR únicos para cada mesa. Los clientes pueden escanear y acceder directamente al chat para hacer pedidos.
            </p>
          </div>
        </section>

        {/* Contenido principal */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Panel de configuración */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Configuración de Mesa
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tableNumber" className="text-sm font-medium text-gray-700">
                      Número de Mesa
                    </Label>
                    <Input
                      id="tableNumber"
                      type="number"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Ej: 12"
                      className="mt-1"
                      min="1"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={generateQR}
                      disabled={loading || !tableNumber}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <QrCode className="h-4 w-4 mr-2" />
                      )}
                      Generar QR
                    </Button>
                    
                    <Button
                      onClick={generateMultipleQRs}
                      variant="outline"
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Múltiples
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Información del QR */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-500" />
                  Información del QR
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">URL del Chat:</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={chatUrl}
                        readOnly
                        className="text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyUrl}
                        className="shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Instrucciones:</strong> Los clientes escanearán este QR y serán dirigidos automáticamente al chat con el número de mesa pre-configurado.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Acciones rápidas */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Acciones Rápidas
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setTableNumber("1")}
                    className="text-sm"
                  >
                    Mesa 1
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setTableNumber("2")}
                    className="text-sm"
                  >
                    Mesa 2
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setTableNumber("5")}
                    className="text-sm"
                  >
                    Mesa 5
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setTableNumber("10")}
                    className="text-sm"
                  >
                    Mesa 10
                  </Button>
                </div>
              </Card>
            </div>

            {/* Visualización del QR */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-green-500" />
                  Código QR - Mesa {tableNumber}
                </h2>
                
                <div className="flex flex-col items-center space-y-4">
                  {qrUrl ? (
                    <>
                      <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200">
                        <img
                          src={qrUrl}
                          alt={`QR Code para Mesa ${tableNumber}`}
                          className="w-64 h-64"
                        />
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                          Escanea este código QR para acceder al chat de la Mesa {tableNumber}
                        </p>
                        <Button
                          onClick={handleDownload}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Descargar QR
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <QrCode className="h-16 w-16 mx-auto mb-2 opacity-50" />
                        <p>Ingresa un número de mesa y genera el QR</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Vista previa del chat */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Vista Previa del Chat
                </h3>
                
                <div className="bg-gray-900 rounded-lg p-4 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400 ml-2">Chat - Mesa {tableNumber}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-600 p-2 rounded">
                      <p>¡Hola! Bienvenido a la Mesa {tableNumber}</p>
                    </div>
                    <div className="bg-gray-700 p-2 rounded">
                      <p>¿En qué puedo ayudarte hoy?</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 