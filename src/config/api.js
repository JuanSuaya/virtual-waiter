// Configuración de APIs
export const API_CONFIG = {
  // API Principal (puerto 8000)
  PRIMARY: {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    ENDPOINTS: {
      // Endpoints de la API principal
      USERS: '/api/users',
      EVENTS: '/api/events',
      ORDERS: '/api/orders',
      // Agregar más endpoints según necesites
    }
  },
  
  // API Secundaria (puerto 8080)
  SECONDARY: {
    BASE_URL: import.meta.env.VITE_API_URL_2 || 'http://localhost:8080',
    ENDPOINTS: {
      // Endpoints de la API del mozo virtual
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
};

// Funciones helper para hacer requests
export const apiRequest = async (apiType, endpoint, options = {}) => {
  const config = API_CONFIG[apiType];
  const url = `${config.BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error calling ${apiType} API:`, error);
    throw error;
  }
};

// Funciones específicas para cada API
export const primaryApi = {
  get: (endpoint, options = {}) => apiRequest('PRIMARY', endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => apiRequest('PRIMARY', endpoint, { 
    ...options, 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  put: (endpoint, data, options = {}) => apiRequest('PRIMARY', endpoint, { 
    ...options, 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  patch: (endpoint, data, options = {}) => apiRequest('PRIMARY', endpoint, { 
    ...options, 
    method: 'PATCH', 
    body: JSON.stringify(data) 
  }),
  delete: (endpoint, options = {}) => apiRequest('PRIMARY', endpoint, { ...options, method: 'DELETE' }),
};

export const secondaryApi = {
  get: (endpoint, options = {}) => apiRequest('SECONDARY', endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => apiRequest('SECONDARY', endpoint, { 
    ...options, 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  put: (endpoint, data, options = {}) => apiRequest('SECONDARY', endpoint, { 
    ...options, 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  patch: (endpoint, data, options = {}) => apiRequest('SECONDARY', endpoint, { 
    ...options, 
    method: 'PATCH', 
    body: JSON.stringify(data) 
  }),
  delete: (endpoint, options = {}) => apiRequest('SECONDARY', endpoint, { ...options, method: 'DELETE' }),
};

// Ejemplo de uso:
// import { primaryApi, secondaryApi } from '@/config/api';
// 
// // Usar API principal (puerto 8000)
// const users = await primaryApi.get('/api/users');
// 
// // Usar API secundaria (puerto 8080)
// const chatMessages = await secondaryApi.post('/api/chat', { message: 'Hola' }); 