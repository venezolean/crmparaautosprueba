# Automotive CRM

Sistema de gestión de relaciones con clientes especializado para concesionarios de automóviles.

## Características

- 👥 Gestión de Clientes
  - Información detallada de contacto
  - Preferencias de vehículos
  - Historial de interacciones
  - Acciones rápidas (llamada, WhatsApp)

- 🚗 Oportunidades de Venta
  - Pipeline visual de ventas
  - Seguimiento de etapas
  - Estimación de valores
  - Próximas acciones

- 📧 Campañas de Email
  - Plantillas personalizables
  - Segmentación por etapa
  - Seguimiento de envíos

- 💬 Automatización de WhatsApp
  - Flujos automatizados
  - Mensajes personalizados
  - Seguimiento de conversaciones

- 📊 Métricas y Reportes
  - Dashboard principal
  - KPIs de ventas
  - Tasas de conversión
  - Tiempo de respuesta

## Tecnologías

- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vite
- React Router

## Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
├── config/           # Configuración y constantes
├── pages/            # Páginas principales
├── types/            # Definiciones de TypeScript
└── utils/            # Utilidades y helpers
```

## Configuración

El sistema utiliza varios archivos de configuración para manejar las opciones comunes:

### Interacciones (`src/config/index.ts`)

- Tipos de interacción (llamada, WhatsApp, email, etc.)
- Motivos de contacto
- Etapas del pipeline
- Catálogo de vehículos
- Preferencias de clientes

## Próximas Características

- [ ] Integración con base de datos
- [ ] Autenticación de usuarios
- [ ] Sistema de notificaciones
- [ ] Integración con APIs de WhatsApp Business
- [ ] Exportación de reportes
- [ ] Calendario de seguimientos

## Desarrollo

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

3. Construir para producción:
```bash
npm run build
```