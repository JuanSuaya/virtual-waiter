import { secondaryApi } from "@/config/api";

// Tipos de datos basados en la documentación de la API
/**
 * @typedef {Object} ChatMessage
 * @property {string} message - El mensaje del usuario
 * @property {number|null} table - Número de mesa (opcional)
 * @property {string|null} session_id - ID de sesión (opcional, default: "default")
 */

/**
 * @typedef {Object} ChatResponse
 * @property {string} response - Respuesta del mozo virtual
 * @property {number|null} table - Número de mesa
 * @property {string} session_id - ID de sesión
 * @property {string} timestamp - Timestamp de la respuesta
 */

/**
 * @typedef {Object} OrderDraft
 * @property {string} order_text - Texto del pedido
 * @property {number} table - Número de mesa
 */

/**
 * @typedef {Object} ConfirmOrder
 * @property {Object} order_draft - Borrador del pedido a confirmar
 */

// Función para chatear con el mozo virtual
export const chatWithWaiter = async (message, table = null, sessionId = null) => {
  try {
    const payload = {
      message: message,
      table: table,
      session_id: sessionId || `table-${table}-session` || "default"
    };

    const response = await secondaryApi.post('/chat', payload);
    return response;
  } catch (error) {
    console.error('Error chatting with waiter:', error);
    throw error;
  }
};

// Función para crear un borrador de pedido
export const createOrderDraft = async (orderText, table) => {
  try {
    const payload = {
      order_text: orderText,
      table: table
    };

    const response = await secondaryApi.post('/order/draft', payload);
    return response;
  } catch (error) {
    console.error('Error creating order draft:', error);
    throw error;
  }
};

// Función para confirmar un pedido
export const confirmOrder = async (orderDraft) => {
  try {
    const payload = {
      order_draft: orderDraft
    };

    const response = await secondaryApi.post('/order/confirm', payload);
    return response;
  } catch (error) {
    console.error('Error confirming order:', error);
    throw error;
  }
};

// Función para obtener todos los menús disponibles
export const getAllMenus = async () => {
  try {
    const response = await secondaryApi.get('/menus');
    return response;
  } catch (error) {
    console.error('Error fetching all menus:', error);
    throw error;
  }
};

// Función para obtener el menú de un restaurante específico
export const getRestaurantMenu = async (restaurantId) => {
  try {
    const response = await secondaryApi.get(`/menu/${restaurantId}`);
    return response;
  } catch (error) {
    console.error('Error fetching restaurant menu:', error);
    throw error;
  }
};

// Función para obtener las órdenes de un restaurante
export const getRestaurantOrders = async (restaurantId, limit = 20) => {
  try {
    const response = await secondaryApi.get(`/orders/${restaurantId}?limit=${limit}`);
    return response;
  } catch (error) {
    console.error('Error fetching restaurant orders:', error);
    throw error;
  }
};

// Función para limpiar el historial de conversación
export const clearConversation = async (sessionId) => {
  try {
    const response = await secondaryApi.delete(`/chat/${sessionId}`);
    return response;
  } catch (error) {
    console.error('Error clearing conversation:', error);
    throw error;
  }
};

// Función para verificar el estado de la API
export const checkApiHealth = async () => {
  try {
    const response = await secondaryApi.get('/health');
    return response;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
};

// Función para generar session ID basado en la mesa
export const generateSessionId = (tableNumber) => {
  return `table-${tableNumber}-session`;
};

// Función para extraer número de mesa de la URL
export const getTableFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mesa = urlParams.get('mesa');
  return mesa ? parseInt(mesa) : null;
};

// Función para crear una sesión de chat inicial
export const initializeChatSession = (tableNumber) => {
  const sessionId = generateSessionId(tableNumber);
  
  // Mensaje de bienvenida personalizado
  const welcomeMessage = tableNumber 
    ? `¡Hola! Bienvenido a la Mesa ${tableNumber}. Soy tu mozo virtual. ¿En qué puedo ayudarte hoy?`
    : "¡Hola! Soy tu mozo virtual. ¿En qué puedo ayudarte hoy?";

  return {
    sessionId,
    tableNumber,
    welcomeMessage,
    messages: [
      {
        id: 1,
        type: 'bot',
        content: welcomeMessage,
        timestamp: new Date()
      }
    ]
  };
};
