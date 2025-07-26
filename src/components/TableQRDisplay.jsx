import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, Smartphone } from "lucide-react";
import { toast } from "sonner";

// Función para generar QR usando QR Server API
const generateQRCode = (text) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
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

export default function TableQRDisplay({ tableNumber, restaurantName = "Restaurante" }) {
  const [qrUrl, setQrUrl] = useState("");
  const [chatUrl, setChatUrl] = useState("");

  useEffect(() => {
    if (tableNumber) {
      const baseUrl = window.location.origin;
      const chatUrlWithTable = `${baseUrl}/chat?mesa=${tableNumber}`;
      setChatUrl(chatUrlWithTable);
      setQrUrl(generateQRCode(chatUrlWithTable));
    }
  }, [tableNumber]);

  const handleDownload = () => {
    if (qrUrl) {
      downloadImage(qrUrl, `qr-mesa-${tableNumber}.png`);
      toast.success('QR descargado');
    }
  };

  const handleCopyUrl = () => {
    copyToClipboard(chatUrl);
  };

  if (!tableNumber) {
    return (
      <Card className="p-6 text-center">
        <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No se especificó número de mesa</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-sm mx-auto">
      <div className="text-center">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">{restaurantName}</h3>
          <p className="text-sm text-gray-600">Mesa {tableNumber}</p>
        </div>

        {/* QR Code */}
        <div className="mb-4">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 inline-block">
            {qrUrl ? (
              <img
                src={qrUrl}
                alt={`QR Code para Mesa ${tableNumber}`}
                className="w-48 h-48"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500 text-sm">Generando QR...</p>
              </div>
            )}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Escanea este código QR para hacer tu pedido
          </p>
          <div className="bg-blue-50 p-2 rounded text-xs text-blue-700">
            <strong>Instrucciones:</strong> Abre la cámara de tu teléfono y apunta al código QR
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Descargar
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyUrl}
            className="text-xs"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copiar URL
          </Button>
        </div>

        {/* URL visible */}
        <div className="mt-3">
          <p className="text-xs text-gray-500 break-all">
            {chatUrl}
          </p>
        </div>
      </div>
    </Card>
  );
} 