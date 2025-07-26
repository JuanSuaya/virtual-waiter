import { primaryApi } from "@/config/api";

// Obtener pedidos por restaurante
export const getOrdersByRestaurant = async (restaurantId) => {
  try {
    const response = await primaryApi.get(`/api/orders/by_restaurant/?restaurant_id=${restaurantId}`);
    return response.results || response || [];
  } catch (error) {
    console.error('Error fetching orders by restaurant:', error);
    throw error;
  }
};

// Obtener todos los pedidos
export const getAllOrders = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await primaryApi.get(`/api/orders/${queryParams ? `?${queryParams}` : ''}`);
    return response.results || response || [];
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

// Actualizar estado de un pedido
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await primaryApi.patch(`/api/orders/${orderId}/update_status/`, {
      status: status
    });
    return response;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Eliminar un pedido
export const deleteOrder = async (orderId) => {
  try {
    const response = await primaryApi.delete(`/api/orders/${orderId}/`);
    return response;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Obtener detalles de un pedido específico
export const getOrderDetails = async (orderId) => {
  try {
    const response = await primaryApi.get(`/api/orders/${orderId}/`);
    return response;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

// Obtener estadísticas de pedidos
export const getOrderStatistics = async (restaurantId = null) => {
  try {
    const params = restaurantId ? `?restaurant_id=${restaurantId}` : '';
    const response = await primaryApi.get(`/api/orders/statistics/${params}`);
    return response;
  } catch (error) {
    console.error('Error fetching order statistics:', error);
    throw error;
  }
};

// Crear un nuevo pedido (para testing)
export const createOrder = async (orderData) => {
  try {
    const response = await primaryApi.post('/api/orders/', orderData);
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}; 