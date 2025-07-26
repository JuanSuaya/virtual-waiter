import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageIcon, X, Maximize2, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const COMPRESSION_QUALITY = 0.8;

export const MediaForm = ({ qrEnabled, setQrEnabled, qrTime, setQrTime }) => {
  const [mainImage, setMainImage] = useState(null);
  const [boxImage, setBoxImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const mainImageInputRef = useRef(null);
  const boxImageInputRef = useRef(null);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Calcular nuevas dimensiones manteniendo la proporción
          let width = img.width;
          let height = img.height;
          const maxDimension = 1920; // Máximo de 1920px en cualquier dimensión

          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              }));
            },
            file.type,
            COMPRESSION_QUALITY
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const validateImage = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Tipo de archivo no permitido. Use JPG, PNG o WEBP.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('El archivo es demasiado grande. Máximo 5MB.');
      return false;
    }

    return true;
  };

  const handleImageUpload = async (event, setImage) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!validateImage(file)) return;

    try {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage({
          file: compressedFile,
          preview: e.target.result
        });
        toast.success('Imagen cargada y comprimida exitosamente');
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      toast.error('Error al procesar la imagen');
      console.error('Error comprimiendo imagen:', error);
    }
  };

  const handleImageClick = (inputRef) => {
    inputRef.current?.click();
  };

  const handleImageRemove = (setImage) => {
    setImage(null);
    toast.success('Imagen eliminada');
  };

  const handlePreviewClick = (image) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  const ImageUploader = ({ image, setImage, inputRef, label }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept={ALLOWED_TYPES.join(',')}
        onChange={(e) => handleImageUpload(e, setImage)}
      />
      <div 
        className="relative flex h-[150px] sm:h-[200px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-violet-200 hover:border-violet-400 transition-colors overflow-hidden group"
        onClick={() => handleImageClick(inputRef)}
      >
        {image ? (
          <>
            <img
              src={image.preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviewClick(image);
                }}
                className="p-2 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageRemove(setImage);
                }}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-violet-400" />
            <p className="text-xs sm:text-sm text-violet-600 text-center px-2">
              Arrastra una imagen o haz clic para seleccionar
            </p>
            <p className="text-xs text-violet-400">
              JPG, PNG o WEBP (máx. 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageUploader
            image={mainImage}
            setImage={setMainImage}
            inputRef={mainImageInputRef}
            label="Imagen Principal"
          />
          <ImageUploader
            image={boxImage}
            setImage={setBoxImage}
            inputRef={boxImageInputRef}
            label="Imagen Box"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="qr"
              checked={qrEnabled}
              onCheckedChange={setQrEnabled}
            />
            <Label htmlFor="qr">Habilitar QR</Label>
          </div>
          {qrEnabled && (
            <div className="space-y-2">
              <Label htmlFor="qrTime">Tiempo antes del evento</Label>
              <Select value={qrTime} onValueChange={setQrTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tiempo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hora antes</SelectItem>
                  <SelectItem value="2h">2 horas antes</SelectItem>
                  <SelectItem value="1d">1 día antes</SelectItem>
                  <SelectItem value="2d">2 días antes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Modal de previsualización */}
      {showPreview && previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={previewImage.preview}
              alt="Preview"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}; 