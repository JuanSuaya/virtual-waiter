# Configuración de Variables de Entorno

## Descripción

Este documento describe las variables de entorno necesarias para ejecutar el proyecto del Mercado Agrícola.

## Variables Requeridas

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
# API URLs
VITE_API_URL=http://localhost:8000
VITE_API_URL_2=http://localhost:8080

# Configuración de desarrollo
NODE_ENV=development

# Configuración de Vite
VITE_APP_TITLE=Mercado Agrícola
VITE_APP_DESCRIPTION=Tu mozo virtual del Mercado Agrícola
```

## Variables Opcionales

```bash
# Analytics
VITE_GA_TRACKING_ID=GA_TRACKING_ID

# Sentry para monitoreo de errores
VITE_SENTRY_DSN=SENTRY_DSN

# Mapas
VITE_MAPBOX_TOKEN=MAPBOX_TOKEN

# Pagos
VITE_STRIPE_PUBLIC_KEY=STRIPE_PUBLIC_KEY

# Notificaciones push
VITE_FIREBASE_CONFIG=FIREBASE_CONFIG
```

## Configuración por Entorno

### Desarrollo
```bash
# .env.development
VITE_API_URL=http://localhost:8000
VITE_API_URL_2=http://localhost:8080
NODE_ENV=development
```

### Producción
```bash
# .env.production
VITE_API_URL=https://api.mercadoagricola.com
VITE_API_URL_2=https://chat.mercadoagricola.com
NODE_ENV=production
```

### Testing
```bash
# .env.test
VITE_API_URL=http://localhost:8000
VITE_API_URL_2=http://localhost:8080
NODE_ENV=test
```

## Instalación

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` con tus valores específicos:
   ```bash
   nano .env
   ```

3. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Seguridad

- **NUNCA** subas el archivo `.env` al repositorio
- **NUNCA** compartas las claves de API en código público
- Usa diferentes variables para desarrollo y producción
- Considera usar un gestor de secretos para producción

## Troubleshooting

### Error: "VITE_API_URL is not defined"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Asegúrate de que las variables empiecen con `VITE_`
- Reinicia el servidor de desarrollo

### Error: "Cannot connect to API"
- Verifica que las URLs de las APIs sean correctas
- Asegúrate de que los servicios estén ejecutándose
- Revisa los logs del servidor

## Referencias

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) 