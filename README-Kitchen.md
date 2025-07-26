# Vista de Cocina - Panel de Pedidos

## Descripción

La vista de cocina es una interfaz especializada para que los cocineros gestionen los pedidos en tiempo real siguiendo un sistema FIFO (First In, First Out). Esta vista está diseñada para ser intuitiva y eficiente, permitiendo a los cocineros ver, actualizar y gestionar pedidos de manera rápida.

## Características Principales

### 🎯 Sistema FIFO
- Los pedidos se muestran en orden de llegada
- Prioridad visual para pedidos pendientes
- Flujo claro: Pendiente → En Preparación → Listo → Removido

### 📊 Dashboard en Tiempo Real
- Estadísticas rápidas de pedidos por estado
- Auto-refresh cada 30 segundos
- Contador de pedidos pendientes, en preparación y listos

### 🎨 Interfaz Intuitiva
- Diseño consistente con el resto de la aplicación
- Colores diferenciados por estado de pedido
- Iconos claros y botones de acción prominentes

## Estados de Pedidos

### 🟡 Pendiente
- Pedidos nuevos que esperan ser iniciados
- Botón "Iniciar" para comenzar la preparación
- Botón "Cancelar" para cancelar el pedido

### 🔵 En Preparación
- Pedidos que están siendo preparados
- Botón "Listo" para marcar como completado
- Botón "Volver" para regresar a pendiente

### 🟢 Listo
- Pedidos completados listos para entregar
- Botón "Remover" para eliminar de la vista

## Funcionalidades

### Gestión de Pedidos
- **Ver detalles completos**: Cliente, items, notas, tiempo
- **Actualizar estado**: Cambiar entre estados con un clic
- **Instrucciones especiales**: Destacadas visualmente
- **Tiempo transcurrido**: Seguimiento del tiempo desde el pedido

### Características Técnicas
- **Auto-refresh**: Actualización automática cada 30 segundos
- **Manual refresh**: Botón para actualizar manualmente
- **Responsive**: Funciona en tablets y pantallas táctiles
- **Notificaciones**: Toast messages para confirmar acciones

## Endpoints Utilizados

### Obtener Pedidos
```
GET /api/orders/by_restaurant/?restaurant_id={id}
```

### Actualizar Estado
```
PATCH /api/orders/{id}/update_status/
Body: { "status": "pending|in_progress|done|cancelled" }
```

### Eliminar Pedido
```
DELETE /api/orders/{id}/
```

## Navegación

### Acceso
- URL: `/kitchen`
- Requiere autenticación
- Botón "Cocina" en el header principal

### Permisos
- Solo usuarios autenticados pueden acceder
- Ideal para roles de cocinero/chef

## Diseño y UX

### Colores por Estado
- **Amarillo**: Pendiente (atención requerida)
- **Azul**: En preparación (trabajo activo)
- **Verde**: Listo (completado)
- **Rojo**: Cancelado (eliminado)

### Elementos Visuales
- **Iconos**: Clock, ChefHat, CheckCircle, XCircle
- **Badges**: Estados claramente identificados
- **Cards**: Información organizada y fácil de leer
- **Botones**: Acciones prominentes y accesibles

## Instrucciones de Uso

### Para Cocineros
1. **Acceder**: Hacer clic en "Cocina" en el header
2. **Revisar pendientes**: Ver pedidos que necesitan atención
3. **Iniciar preparación**: Hacer clic en "Iniciar" para comenzar
4. **Marcar como listo**: Hacer clic en "Listo" cuando termine
5. **Remover completados**: Eliminar pedidos entregados

### Flujo de Trabajo
1. Los nuevos pedidos aparecen en "Pendientes"
2. Al hacer clic en "Iniciar", el pedido va a "En Preparación"
3. Al completar, hacer clic en "Listo"
4. Finalmente, "Remover" para limpiar la vista

## Configuración

### Auto-refresh
- Activado por defecto
- Se puede desactivar con el botón "Auto-refresh OFF"
- Intervalo: 30 segundos

### Restaurante
- Por defecto: Restaurante ID 1
- Configurable en el código para múltiples restaurantes

## Componentes

### OrderCard
- Componente reutilizable para mostrar pedidos
- Maneja todos los estados y acciones
- Muestra instrucciones especiales destacadas

### KitchenOrders
- Página principal de la vista de cocina
- Gestiona el estado global y las llamadas a la API
- Organiza los pedidos por estado

## API Functions

### getOrdersByRestaurant(restaurantId)
Obtiene todos los pedidos de un restaurante específico

### updateOrderStatus(orderId, status)
Actualiza el estado de un pedido

### deleteOrder(orderId)
Elimina un pedido completado

## Consideraciones Técnicas

### Performance
- Lazy loading de pedidos
- Optimización de re-renders
- Debouncing en actualizaciones

### Error Handling
- Manejo de errores de red
- Toast notifications para feedback
- Fallbacks para datos faltantes

### Responsive Design
- Grid adaptativo para diferentes pantallas
- Botones táctiles para tablets
- Texto legible en todas las resoluciones

## Futuras Mejoras

### Funcionalidades Planificadas
- [ ] Filtros por tipo de comida
- [ ] Búsqueda de pedidos
- [ ] Estadísticas avanzadas
- [ ] Notificaciones push
- [ ] Modo oscuro para cocinas
- [ ] Integración con impresoras de cocina

### Optimizaciones
- [ ] WebSockets para actualizaciones en tiempo real
- [ ] Cache local para mejor performance
- [ ] Offline mode básico
- [ ] Sonidos de notificación 