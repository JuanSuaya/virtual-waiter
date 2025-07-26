"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Clock, 
  CheckCircle, 
  ChefHat, 
  AlertCircle,
  RefreshCw,
  Play,
  Pause,
  XCircle
} from "lucide-react";
import Layout from "@/layouts/layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderCard from "@/components/OrderCard";
import { 
  getOrdersByRestaurant, 
  updateOrderStatus, 
  deleteOrder 
} from "@/api/kitchen";

// Estados de los pedidos
const ORDER_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
  CANCELLED: 'cancelled'
};

// Configuración de estados
const STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: {
    label: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    bgColor: 'bg-yellow-50 border-yellow-200'
  },
  [ORDER_STATUS.IN_PROGRESS]: {
    label: 'En Preparación',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: ChefHat,
    bgColor: 'bg-blue-50 border-blue-200'
  },
  [ORDER_STATUS.DONE]: {
    label: 'Listo',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    bgColor: 'bg-green-50 border-green-200'
  },
  [ORDER_STATUS.CANCELLED]: {
    label: 'Cancelado',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
    bgColor: 'bg-red-50 border-red-200'
  }
};

export default function KitchenOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(30);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  // Función para obtener pedidos del restaurante
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await getOrdersByRestaurant(selectedRestaurant);
      setOrders(ordersData);
      
      // Extraer información del restaurante del primer pedido si existe
      if (ordersData.length > 0 && ordersData[0].restaurant_name) {
        setRestaurantInfo({
          name: ordersData[0].restaurant_name,
          id: ordersData[0].restaurant
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar estado del pedido
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      
      toast.success(`Pedido ${newStatus === ORDER_STATUS.DONE ? 'marcado como listo' : 'actualizado'}`);
      fetchOrders(); // Recargar pedidos
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error al actualizar el pedido');
    }
  };

  // Función para remover pedido completado
  const removeOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      toast.success('Pedido removido');
      fetchOrders();
    } catch (error) {
      console.error('Error removing order:', error);
      toast.error('Error al remover el pedido');
    }
  };

  // Auto-refresh cada 30 segundos
  useEffect(() => {
    fetchOrders();
    
    if (autoRefresh) {
      const interval = setInterval(fetchOrders, 30000);
      return () => clearInterval(interval);
    }
  }, [selectedRestaurant, autoRefresh]);

  // Filtrar pedidos por estado
  const pendingOrders = orders.filter(order => order.status === ORDER_STATUS.PENDING);
  const inProgressOrders = orders.filter(order => order.status === ORDER_STATUS.IN_PROGRESS);
  const doneOrders = orders.filter(order => order.status === ORDER_STATUS.DONE);

  // Calcular totales
  const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);
  const totalItems = orders.reduce((sum, order) => sum + order.order_items?.length || 0, 0);



  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        {/* Header de la cocina */}
        <section className="w-full bg-gradient-to-r from-blue-600 to-blue-500 py-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-white mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <ChefHat className="h-8 w-8" />
                  Cocina - Panel de Pedidos
                </h1>
                <p className="text-orange-100">
                  {restaurantInfo ? `${restaurantInfo.name} - ` : ''}Gestiona los pedidos en tiempo real
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  {autoRefresh ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
                </Button>
                
                <Button
                  size="sm"
                  className="bg-white text-orange-600 hover:bg-orange-50"
                  onClick={fetchOrders}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-700">{pendingOrders.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </Card>
            
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">En Preparación</p>
                  <p className="text-2xl font-bold text-blue-700">{inProgressOrders.length}</p>
                </div>
                <ChefHat className="h-8 w-8 text-blue-500" />
              </div>
            </Card>
            
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Listos</p>
                  <p className="text-2xl font-bold text-green-700">{doneOrders.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </Card>
            
            <Card className="p-4 bg-gray-50 border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total</p>
                  <p className="text-2xl font-bold text-gray-700">{orders.length}</p>
                  <p className="text-xs text-gray-500">${totalAmount.toFixed(2)}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-gray-500" />
              </div>
            </Card>
          </div>

          {/* Pedidos pendientes - PRIORIDAD ALTA */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Pedidos Pendientes ({pendingOrders.length})
            </h2>
            
            {pendingOrders.length === 0 ? (
              <Card className="p-8 text-center bg-yellow-50 border-yellow-200">
                <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <p className="text-yellow-700 font-medium">No hay pedidos pendientes</p>
                <p className="text-yellow-600 text-sm">Los nuevos pedidos aparecerán aquí</p>
              </Card>
                         ) : (
               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                 {pendingOrders.map((order) => (
                   <OrderCard
                     key={order.id}
                     order={order}
                     onUpdateStatus={handleUpdateOrderStatus}
                     onRemove={removeOrder}
                   />
                 ))}
               </div>
             )}
          </div>

          {/* Pedidos en preparación */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-blue-500" />
              En Preparación ({inProgressOrders.length})
            </h2>
            
            {inProgressOrders.length === 0 ? (
              <Card className="p-8 text-center bg-blue-50 border-blue-200">
                <ChefHat className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <p className="text-blue-700 font-medium">No hay pedidos en preparación</p>
                <p className="text-blue-600 text-sm">Inicia un pedido pendiente para comenzar</p>
              </Card>
                         ) : (
               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                 {inProgressOrders.map((order) => (
                   <OrderCard
                     key={order.id}
                     order={order}
                     onUpdateStatus={handleUpdateOrderStatus}
                     onRemove={removeOrder}
                   />
                 ))}
               </div>
             )}
          </div>

          {/* Pedidos listos */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Listos para Entregar ({doneOrders.length})
            </h2>
            
            {doneOrders.length === 0 ? (
              <Card className="p-8 text-center bg-green-50 border-green-200">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <p className="text-green-700 font-medium">No hay pedidos listos</p>
                <p className="text-green-600 text-sm">Los pedidos completados aparecerán aquí</p>
              </Card>
                         ) : (
               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                 {doneOrders.map((order) => (
                   <OrderCard
                     key={order.id}
                     order={order}
                     onUpdateStatus={handleUpdateOrderStatus}
                     onRemove={removeOrder}
                   />
                 ))}
               </div>
             )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 