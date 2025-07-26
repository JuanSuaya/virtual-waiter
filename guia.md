# 🔌 Guía de Conexión Frontend → Mozo Virtual

## 📋 Opciones para Conectar tu Frontend

### **Opción 1: API Gateway HTTP (Recomendado para Hackathon)**

3. **Tu frontend se conecta a:** `http://localhost:8000`

#### 📡 **Endpoints Disponibles:**

```javascript
// 1. Conversar con el mozo virtual
POST http://localhost:8000/chat
{
    "mensaje": "Hola, quiero una hamburguesa completa",
    "mesa": 12,
    "session_id": "mesa-12-unique-id"
}

// Respuesta:
{
    "respuesta": "¡Hola! Una hamburguesa completa de La Chivitería ($350). ¿Algo más?",
    "mesa": 12,
    "session_id": "mesa-12-unique-id",
    "timestamp": "2024-12-20T10:30:00"
}

// 2. Ver todos los menús
GET http://localhost:8000/menus

// 3. Ver menú de un local específico
GET http://localhost:8000/menu/la-chiviteria

// 4. Ver comandas de un local (para pantallas de cocina)
GET http://localhost:8000/pedidos/la-chiviteria

// 5. Health check
GET http://localhost:8000/health
```

---

### **Opción 2: Cliente MCP Directo**

Si prefieres conectarte directamente al servidor MCP:

```bash
# Instalar cliente MCP
npm install @modelcontextprotocol/sdk

# Tu frontend usa el SDK para conectarse directamente
```

---

### **Opción 3: Frontend de Ejemplo Incluido**

He creado un frontend de ejemplo en `frontend_example.html` que puedes usar como base o referencia.

#### 🎯 **Para usarlo:**

1. **Inicia el API Gateway:**
```bash
python app/api_gateway.py
```

2. **Abre el archivo HTML:**
```bash
open frontend_example.html
```

3. **¡Ya funciona!** El chat se conecta automáticamente.

---

## 💻 **Código JavaScript para tu Frontend**

### **Función Principal de Chat:**

```javascript
// Configuración
const API_BASE_URL = 'http://localhost:8000';
let sessionId = `mesa-${Math.random().toString(36).substr(2, 9)}`;

// Función para enviar mensajes
async function enviarMensaje(mensaje, mesa = 12) {
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mensaje: mensaje,
                mesa: mesa,
                session_id: sessionId
            })
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Mozo dice:', data.respuesta);
        return data.respuesta;
        
    } catch (error) {
        console.error('Error:', error);
        return 'Error de conexión';
    }
}

// Ejemplo de uso
enviarMensaje("Hola, ¿qué menús tienen?", 12);
```

### **Función para Obtener Menús:**

```javascript
async function obtenerMenus() {
    try {
        const response = await fetch(`${API_BASE_URL}/menus`);
        const data = await response.json();
        
        console.log('Menús disponibles:', data.menus);
        return data.menus;
        
    } catch (error) {
        console.error('Error obteniendo menús:', error);
        return null;
    }
}
```

### **Para React/Vue/Angular:**

```javascript
// Hook de React ejemplo
import { useState, useEffect } from 'react';

function useMozoVirtual() {
    const [respuesta, setRespuesta] = useState('');
    const [cargando, setCargando] = useState(false);
    
    const enviarMensaje = async (mensaje, mesa) => {
        setCargando(true);
        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mensaje, mesa, session_id: 'react-session' })
            });
            
            const data = await response.json();
            setRespuesta(data.respuesta);
            
        } catch (error) {
            setRespuesta('Error de conexión');
        } finally {
            setCargando(false);
        }
    };
    
    return { enviarMensaje, respuesta, cargando };
}
```

---

## 🎯 **Flujo Completo de Integración**

### **1. Para Clientes (Chat):**
```
Tu Frontend Chat → API Gateway (puerto 8000) → Mozo Virtual MCP → LLM (Gemini)
```

### **2. Para Locales (Comandas):**
```
Tu Frontend Cocina → GET /pedidos/local-id → Base de datos SQLite
```

### **3. Datos que Manejas:**

```javascript
// Estructura de mensaje del usuario
{
    "mensaje": "Quiero una hamburguesa y un jugo",
    "mesa": 12,
    "session_id": "unique-session-id"
}

// Estructura de respuesta del mozo
{
    "respuesta": "¡Perfecto! Una hamburguesa completa...",
    "mesa": 12,
    "session_id": "unique-session-id", 
    "timestamp": "2024-12-20T10:30:00"
}

// Estructura de menús
{
    "la-chiviteria": {
        "nombre": "La Chivitería",
        "descripcion": "Especialistas en hamburguesas",
        "items": [
            {
                "item": "Hamburguesa Completa",
                "precio": 350,
                "descripcion": "Con lechuga, tomate..."
            }
        ]
    }
}

// Estructura de comandas para locales
{
    "local_id": "la-chiviteria",
    "total_pedidos": 3,
    "pedidos": [
        {
            "pedido_id": 124,
            "mesa": 12,
            "timestamp": "2024-12-20T21:38:00",
            "items": [
                {
                    "descripcion": "Hamburguesa Completa",
                    "cantidad": 1,
                    "precio_total": 350
                }
            ]
        }
    ]
}
```

---

## 🚀 **Pasos para la Demo de Hackathon**

### **Setup Rápido:**

1. **Terminal 1 - Inicia API Gateway:**
```bash
cd /tu/proyecto/mcp-manager
python app/api_gateway.py
```

2. **Terminal 2 - Prueba que funciona:**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"mensaje": "Hola", "mesa": 12}'
```

3. **Tu Frontend se conecta a `localhost:8000`**

### **URLs de la Demo:**
- 🤖 **Chat del Mozo:** `http://localhost:8000/chat`
- 📋 **Menús:** `http://localhost:8000/menus`  
- 🏪 **Comandas La Chivitería:** `http://localhost:8000/pedidos/la-chiviteria`
- 🥗 **Comandas Naturalia:** `http://localhost:8000/pedidos/naturalia`
- 🍖 **Comandas Parrilla:** `http://localhost:8000/pedidos/parrilla-del-puerto`
- 📚 **Documentación Auto:** `http://localhost:8000/docs`

---

## 🔧 **Troubleshooting**

### **Error: "Connection refused"**
```bash
# Verifica que el API Gateway esté corriendo
curl http://localhost:8000/health
```

### **Error: "CORS"**
El API Gateway ya tiene CORS configurado para permitir todas las conexiones durante desarrollo.

### **Error: "LLM API"**
```bash
# Verifica la configuración
echo $GEMINI_API_KEY
```

### **Para Producción:**
- Cambiar `allow_origins=["*"]` por tu dominio específico
- Usar HTTPS en lugar de HTTP
- Configurar rate limiting
- Usar Redis para sesiones en lugar de memoria

---

**¡Listo! Tu frontend ahora puede conversar con el mozo virtual 🤖🍔**