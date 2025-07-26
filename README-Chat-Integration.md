# Integración con API del Chat - Mozo Virtual

## Descripción

Este documento describe la integración entre el frontend y la API del mozo virtual que corre en `http://localhost:8080`. La integración permite a los clientes chatear con un asistente virtual para hacer pedidos desde sus mesas.

## Endpoints de la API

### Base URL
```
http://localhost:8080
```

### Endpoints Principales

#### 1. Chat con el Mozo Virtual
```
POST /chat
```

**Payload:**
```json
{
  "message": "Hola, quiero una pizza",
  "table": 12,
  "session_id": "table-12-session"
}
```

**Response:**
```json
{
  "response": "¡Hola! Te ayudo con tu pedido de pizza. ¿Qué tipo de pizza te gustaría?",
  "table": 12,
  "session_id": "table-12-session",
  "timestamp": "2025-01-26T15:30:00Z"
}
```

#### 2. Crear Borrador de Pedido
```
POST /order/draft
```

**Payload:**
```json
{
  "order_text": "Una pizza margarita y una bebida",
  "table": 12
}
```

#### 3. Confirmar Pedido
```
POST /order/confirm
```

**Payload:**
```json
{
  "order_draft": {
    // Objeto del borrador del pedido
  }
}
```

#### 4. Obtener Menús
```
GET /menus
```

#### 5. Obtener Menú de Restaurante
```
GET /menu/{restaurant_id}
```

#### 6. Obtener Órdenes de Restaurante
```
GET /orders/{restaurant_id}?limit=20
```

#### 7. Limpiar Conversación
```
DELETE /chat/{session_id}
```

#### 8. Health Check
```
GET /health
```

## Integración en el Frontend

### 1. Configuración de API

El frontend usa la configuración en `src/config/api.js`:

```javascript
SECONDARY: {
  BASE_URL: import.meta.env.VITE_API_URL_2 || 'http://localhost:8080',
  ENDPOINTS: {
    CHAT: '/chat',
    ORDER_DRAFT: '/order/draft',
    ORDER_CONFIRM: '/order/confirm',
    MENUS: '/menus',
    MENU_RESTAURANT: '/menu',
    ORDERS_RESTAURANT: '/orders',
    CLEAR_SESSION: '/chat',
    HEALTH: '/health',
  }
}
```

### 2. Funciones de la API

Las funciones están definidas en `src/api/chat.jsx`:

#### `chatWithWaiter(message, table, sessionId)`
Envía un mensaje al mozo virtual.

#### `createOrderDraft(orderText, table)`
Crea un borrador de pedido.

#### `confirmOrder(orderDraft)`
Confirma un pedido.

#### `getAllMenus()`
Obtiene todos los menús disponibles.

#### `getRestaurantMenu(restaurantId)`
Obtiene el menú de un restaurante específico.

#### `getRestaurantOrders(restaurantId, limit)`
Obtiene las órdenes de un restaurante.

#### `clearConversation(sessionId)`
Limpia el historial de conversación.

#### `checkApiHealth()`
Verifica el estado de la API.

### 3. Gestión de Sesiones

#### Generación de Session ID
```javascript
export const generateSessionId = (tableNumber) => {
  return `table-${tableNumber}-session`;
};
```

#### Inicialización de Sesión
```javascript
export const initializeChatSession = (tableNumber) => {
  const sessionId = generateSessionId(tableNumber);
  
  const welcomeMessage = tableNumber 
    ? `¡Hola! Bienvenido a la Mesa ${tableNumber}. Soy tu mozo virtual. ¿En qué puedo ayudarte hoy?`
    : "¡Hola! Soy tu mozo virtual. ¿En qué puedo ayudarte hoy?";

  return {
    sessionId,
    tableNumber,
    welcomeMessage,
    messages: [
      {
        type: 'bot',
        content: welcomeMessage,
        timestamp: new Date().toISOString()
      }
    ]
  };
};
```

### 4. Integración con QR Codes

Los códigos QR generan URLs con el parámetro `mesa`:

```
http://localhost:3000/chat?mesa=12
```

El frontend extrae automáticamente el número de mesa:

```javascript
export const getTableFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mesa = urlParams.get('mesa');
  return mesa ? parseInt(mesa) : null;
};
```

## Flujo de Uso

### 1. Cliente Escanea QR
- El cliente escanea el QR de su mesa
- Se abre la página del chat con `?mesa=12`
- Se inicializa automáticamente la sesión para esa mesa

### 2. Chat Inicial
- El mozo virtual saluda personalizado para la mesa
- El cliente puede hacer preguntas sobre menús
- El mozo virtual responde con información relevante

### 3. Proceso de Pedido
- El cliente describe lo que quiere
- El mozo virtual procesa el pedido
- Se crea un borrador del pedido
- El cliente confirma el pedido

### 4. Confirmación
- El pedido se envía al sistema
- El cliente recibe confirmación
- El pedido aparece en la vista de cocina

## Manejo de Errores

### Errores de Conexión
- Se muestran mensajes de error amigables
- Se mantiene el historial de mensajes
- Se puede reintentar la conexión

### Errores de API
- Se capturan y muestran errores específicos
- Se mantiene la funcionalidad básica
- Se registran errores en consola para debugging

## Variables de Entorno

```bash
# API del mozo virtual
VITE_API_URL_2=http://localhost:8080

# API principal (pedidos)
VITE_API_URL=http://localhost:8000
```

## Testing

### Verificar API
```bash
curl http://localhost:8080/health
```

### Probar Chat
```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hola",
    "table": 12,
    "session_id": "table-12-session"
  }'
```

### Probar Menús
```bash
curl http://localhost:8080/menus
```

## Consideraciones de Seguridad

1. **Validación de entrada** - Todos los parámetros se validan
2. **Sanitización** - Los mensajes se sanitizan antes de enviar
3. **Rate limiting** - La API implementa límites de velocidad
4. **Session management** - Cada mesa tiene su propia sesión

## Futuras Mejoras

1. **WebSocket** - Para actualizaciones en tiempo real
2. **Notificaciones push** - Para avisos de pedidos listos
3. **Historial de pedidos** - Para ver pedidos anteriores
4. **Múltiples idiomas** - Soporte para diferentes idiomas
5. **Integración con pagos** - Para pagos digitales 