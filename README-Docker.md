# 🐳 Docker Setup - Mercado Agrícola Frontend

Este proyecto incluye configuración completa de Docker para desarrollo y producción.

## 📋 Prerrequisitos

- Docker
- Docker Compose

## 🚀 Comandos Rápidos

### Desarrollo
```bash
# Levantar en modo desarrollo
docker-compose --profile dev up

# Levantar con hot reload (recomendado para desarrollo)
docker-compose --profile dev-hot up

# Levantar en background
docker-compose --profile dev up -d
```

### Producción
```bash
# Levantar en modo producción
docker-compose --profile prod up

# Levantar en background
docker-compose --profile prod up -d
```

### Construcción de Imágenes
```bash
# Construir imagen de desarrollo
docker build -f Dockerfile.dev -t mercado-agricola-dev .

# Construir imagen de producción
docker build -t mercado-agricola-prod .
```

## 🔧 Configuraciones

### Variables de Entorno
- `NODE_ENV`: development/production
- `VITE_API_URL`: URL del backend API principal (puerto 8000)
- `VITE_API_URL_2`: URL del backend API secundario (puerto 8080)
- `CHOKIDAR_USEPOLLING`: true para hot reload en Docker

### Puertos
- **Desarrollo**: `http://localhost:3001`
- **Producción**: `http://localhost:80`

## 📁 Estructura de Archivos Docker

```
├── Dockerfile          # Imagen de producción (multi-stage)
├── Dockerfile.dev      # Imagen de desarrollo
├── docker-compose.yml  # Orquestación de servicios
├── nginx.conf         # Configuración de nginx
└── .dockerignore      # Archivos excluidos del build
```

## 🛠️ Características

### Dockerfile (Producción)
- **Multi-stage build** para optimizar tamaño
- **Node.js 18 Alpine** para el build
- **Nginx Alpine** para servir archivos estáticos
- **Compresión gzip** habilitada
- **Caché optimizado** para archivos estáticos

### Dockerfile.dev (Desarrollo)
- **Hot reload** habilitado
- **Volúmenes montados** para desarrollo en tiempo real
- **Todas las dependencias** incluidas

### Nginx Configuration
- **SPA routing** (React Router compatible)
- **Compresión gzip** para mejor rendimiento
- **Headers de seguridad** configurados
- **Caché optimizado** para diferentes tipos de archivos

## 🔍 Troubleshooting

### Problemas Comunes

1. **Puerto ya en uso**
   ```bash
   # Cambiar puerto en docker-compose.yml
   ports:
     - "3002:3001"  # Cambiar 3001 por 3002
   ```

2. **Hot reload no funciona**
   ```bash
   # Usar el perfil dev-hot
   docker-compose --profile dev-hot up
   ```

3. **Permisos de archivos**
   ```bash
   # En Linux/Mac, ajustar permisos
   sudo chown -R $USER:$USER .
   ```

### Logs y Debugging
```bash
# Ver logs del contenedor
docker-compose logs app-dev

# Ver logs en tiempo real
docker-compose logs -f app-dev

# Entrar al contenedor
docker-compose exec app-dev sh
```

## 🚀 Despliegue

### Local
```bash
# Desarrollo
docker-compose up

# Producción
docker-compose --profile prod up
```

## 🔌 Configuración de APIs

El proyecto está configurado para trabajar con dos APIs:

### API Principal (Puerto 8000)
- **URL**: `http://localhost:8000`
- **Variable**: `VITE_API_URL`
- **Uso**: Endpoints principales de la aplicación

### API Secundaria (Puerto 8080) - Mozo Virtual
- **URL**: `http://localhost:8080`
- **Variable**: `VITE_API_URL_2`
- **Uso**: API del mozo virtual MCP con endpoints de chat
- **Endpoints**:
  - `POST /chat` - Enviar mensajes al mozo virtual
  - `GET /menus` - Obtener todos los menús
  - `GET /menu/{local}` - Menú de un local específico
  - `GET /pedidos/{local}` - Pedidos de un local
  - `GET /health` - Health check de la API

### Uso en el Código
```javascript
import { primaryApi, secondaryApi } from '@/config/api';
import { chatAPI } from '@/api/chat';

// API Principal (puerto 8000)
const users = await primaryApi.get('/api/users');

// API Secundaria (puerto 8080) - Mozo Virtual
const chatResponse = await chatAPI.sendMessage('Hola, quiero una hamburguesa', 12);
const menus = await chatAPI.getMenus();
const health = await chatAPI.healthCheck();
```

## 🤖 Integración con el Mozo Virtual

El chat ahora está completamente integrado con la API del mozo virtual MCP:

### **Características Implementadas:**
- ✅ **Conexión real** con la API del mozo virtual
- ✅ **Manejo de sesiones** automático
- ✅ **Health check** en tiempo real
- ✅ **Indicador de estado** de conexión
- ✅ **Manejo de errores** robusto
- ✅ **Respuestas dinámicas** del LLM

### **Flujo de Comunicación:**
```
Frontend Chat → API Gateway (puerto 8080) → Mozo Virtual MCP → LLM (Gemini)
```

### Servidor
```bash
# Construir y levantar en producción
docker-compose --profile prod up -d --build

# Verificar estado
docker-compose ps

# Detener servicios
docker-compose down
```

## 📊 Monitoreo

```bash
# Ver uso de recursos
docker stats

# Ver contenedores activos
docker ps

# Limpiar recursos no utilizados
docker system prune
```

## 🔒 Seguridad

- Headers de seguridad configurados en nginx
- Imágenes basadas en Alpine Linux (más seguras)
- Usuario no-root en contenedores
- Configuración de Content Security Policy

## 📝 Notas

- El modo desarrollo incluye todas las devDependencies
- El modo producción solo incluye dependencias necesarias
- Los volúmenes están configurados para hot reload
- Nginx está optimizado para aplicaciones React SPA 