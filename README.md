# Trading Academy - Plataforma Educativa

![Trading Academy Logo](src/assets/images/logo.png)

Trading Academy es una plataforma educativa completa para aprender sobre trading y mercados financieros. Desarrollada con Angular, ofrece una experiencia interactiva para estudiantes que desean mejorar sus habilidades de trading.

## Características Principales

### 🏠 Página Principal
- Slider de imágenes con información destacada
- Secciones de cursos destacados
- Testimonios de estudiantes
- Estadísticas de la plataforma

### 👨‍🏫 Cursos
- Catálogo de cursos filtrable por categoría
- Detalles de cada curso con programa y requisitos
- Sistema de inscripción a cursos

### 💬 Chat en Vivo
- Comunicación directa con asesores
- Historial de conversaciones
- Notificaciones de mensajes no leídos

### 🏪 Tienda
- Catálogo de productos y recursos
- Filtrado y búsqueda avanzada
- Carrito de compras interactivo
- Panel de detalles de producto
- Animaciones y efectos visuales

### 📊 Multimedia
- **Reproductor de Video**: Integración segura de videos de YouTube
  - Configuración de proporción y tamaño
  - Opciones de autoplay
  - Manejo de errores y placeholders
- **Galería de Imágenes**:
  - Navegación entre imágenes
  - Modo pantalla completa
  - Miniaturas para navegación rápida
  - Información detallada de cada imagen
  - Presentación automática (slideshow)
- **Sistema de Valoración**:
  - Calificación con estrellas (1-5)
  - Contador de votos
  - Persistencia de valoraciones
  - Interfaz interactiva

### 🔍 Preguntas Frecuentes
- Sección de FAQ organizada por categorías
- Búsqueda en tiempo real
- Acordeones interactivos

### 📱 Características Generales
- Diseño totalmente responsive
- Navegación intuitiva
- Animaciones para mejor experiencia de usuario
- Mapa de ubicación integrado vía OpenStreetMap

## Tecnologías Utilizadas

- **Framework**: Angular 19+
- **UI Framework**: Bootstrap 5
- **Iconos**: Bootstrap Icons
- **Estilos**: CSS/SCSS con variables CSS personalizadas
- **Animaciones**: CSS nativo e interpolaciones de Angular
- **Mapas**: OpenStreetMap integrado mediante iframe
- **Persistencia**: LocalStorage para datos de usuario y valoraciones

## Estructura del Proyecto

```
proyecto-IV/
├── src/
│   ├── app/
│   │   ├── components/       # Componentes de la aplicación
│   │   │   ├── about/        # Acerca de nosotros
│   │   │   ├── chat/         # Sistema de chat
│   │   │   ├── contact/      # Formulario de contacto
│   │   │   ├── faq/          # Preguntas frecuentes
│   │   │   ├── gallery/      # Componente de galería
│   │   │   ├── home/         # Página principal
│   │   │   ├── image-rating/ # Sistema de valoración
│   │   │   ├── login/        # Autenticación
│   │   │   ├── multimedia-demo/ # Demo de componentes multimedia
│   │   │   ├── nav-bar/      # Barra de navegación
│   │   │   ├── slider/       # Carrusel de imágenes
│   │   │   ├── tienda/       # Tienda virtual
│   │   │   └── video-player/ # Reproductor de video
│   │   ├── services/         # Servicios de la aplicación
│   │   │   ├── auth.service.ts    # Autenticación
│   │   │   ├── chat.service.ts    # Comunicación
│   │   │   └── rating.service.ts  # Valoraciones
│   │   └── models/           # Interfaces y clases
│   ├── assets/               # Recursos estáticos
│   │   ├── images/           # Imágenes
│   │   └── data/             # Datos JSON estáticos
│   └── environments/         # Configuración por entorno
│       ├── environment.ts    # Configuración para desarrollo
│       └── environment.prod.ts # Configuración para producción
├── angular.json              # Configuración de Angular
├── proxy.conf.json           # Configuración de proxy para desarrollo
└── package.json              # Dependencias
```

## Componentes Principales

### NavBarComponent
Barra de navegación global con enlaces a todas las secciones principales.

### HomeComponent
Página de inicio que muestra información destacada y sirve como punto de entrada principal.

### GalleryComponent
Componente para mostrar colecciones de imágenes con navegación y opciones de visualización.

Propiedades:
- `images`: Lista de imágenes a mostrar
- `showThumbnails`: Controla la visibilidad de miniaturas
- `autoPlay`: Activa la reproducción automática
- `autoPlayInterval`: Intervalo entre imágenes (ms)
- `enableRating`: Activa el sistema de valoración

### VideoPlayerComponent
Componente para reproducir videos de YouTube de forma segura.

Propiedades:
- `videoId`: ID del video de YouTube
- `width`: Ancho del reproductor
- `height`: Alto del reproductor
- `autoplay`: Controla la reproducción automática

### ImageRatingComponent
Sistema de valoración con estrellas para imágenes.

Propiedades:
- `imageId`: Identificador único de la imagen
- `currentRating`: Valoración actual
- `readonly`: Modo solo lectura
- `totalVotes`: Número total de votos

## Guía de Instalación

### Requisitos previos
- Node.js (v18+ recomendado)
- npm (v9+ recomendado)
- Angular CLI (v19+ recomendado)

### Pasos de instalación

1. Clonar el repositorio:
```bash
git clone <repositorio>
cd proyecto-IV
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
ng serve
```

4. Abrir navegador en `http://localhost:4200/`

## Construir para producción

Para generar una versión optimizada para producción:

```bash
ng build --prod
```

Los archivos de distribución se generarán en la carpeta `dist/`.

## Autor

Trading Academy Team

## Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).

## Rutas de la Aplicación

La aplicación utiliza el sistema de enrutamiento de Angular para navegar entre las diferentes secciones:

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | HomeComponent | Página principal con slider y secciones destacadas |
| `/about` | AboutComponent | Información sobre la academia, equipo y ubicación |
| `/login` | LoginComponent | Formulario de inicio de sesión y registro |
| `/multimedia` | MultimediaDemoComponent | Demostración de videos y galerías de imágenes |
| `/tienda` | TiendaComponent | Catálogo de productos y carrito de compras |
| `/contacto` | ContactoComponent | Formulario de contacto para consultas |
| `/faq` | FaqComponent | Preguntas frecuentes organizadas por categorías |
| `/chat` | ChatComponent | Sistema de mensajería con asesores |
| `/nosotros` | NosotrosComponent | Información detallada sobre Trading Academy |
| `/cursos` | CursosComponent | Catálogo de cursos disponibles |

## API y Solicitudes HTTP

La aplicación se comunica con un servidor backend a través de una API RESTful. A continuación se detallan los principales endpoints utilizados:

### Configuración de Entornos API

La aplicación utiliza un sistema de entornos para gestionar las URLs de la API:

#### Desarrollo
- URL Base API: `/api` (relativa, a través de proxy)
- Servidor de desarrollo: `http://localhost/Proyecto IV/proyecto-IV/public`
- Archivo de configuración: `src/environments/environment.ts`

#### Producción
- URL Base API: `https://apiproyectoiv-production.up.railway.app/api`
- Servidor de producción: Railway
- Archivo de configuración: `src/environments/environment.prod.ts`

El sistema cambia automáticamente entre estas configuraciones al compilar la aplicación para producción o ejecutarla en modo desarrollo, sin necesidad de modificar el código fuente.

### Autenticación

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| POST | `/api/auth/login` | Iniciar sesión | `{ email, password }` |
| POST | `/api/auth/register` | Registrar usuario | `{ name, email, password }` |
| POST | `/api/auth/logout` | Cerrar sesión | Token de autenticación |
| GET | `/api/auth/user` | Obtener usuario actual | Token de autenticación |

### Chat y Mensajería

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/chat/conversations` | Obtener conversaciones | Token de autenticación |
| GET | `/api/chat/messages/:id` | Obtener mensajes de una conversación | Token de autenticación, ID de conversación |
| POST | `/api/chat/messages` | Enviar mensaje | Token de autenticación, `{ conversation_id, message }` |
| PUT | `/api/chat/messages/read/:id` | Marcar mensajes como leídos | Token de autenticación, ID del emisor |

### Tienda

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/products` | Obtener todos los productos | Filtros opcionales |
| GET | `/api/products/:id` | Obtener detalles de un producto | ID del producto |
| POST | `/api/orders` | Crear una orden | Token de autenticación, detalles del pedido |
| GET | `/api/orders` | Obtener historial de órdenes | Token de autenticación |

### Cursos

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/courses` | Obtener todos los cursos | Filtros opcionales |
| GET | `/api/courses/:id` | Obtener detalles de un curso | ID del curso |
| POST | `/api/courses/enroll` | Inscribirse en un curso | Token de autenticación, ID del curso |
| GET | `/api/users/courses` | Obtener cursos del usuario | Token de autenticación |

### Contacto

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| POST | `/api/contact` | Enviar mensaje de contacto | `{ name, email, subject, message }` |

## Gestión de Estados

La aplicación utiliza los siguientes métodos para gestionar el estado:

- **Servicios de Angular**: Para compartir datos entre componentes
- **LocalStorage**: Para persistencia de datos del lado del cliente (carrito, valoraciones, preferencias)
- **RxJS Observables**: Para manejar flujos de datos asincrónicos y comunicación entre componentes
- **Inyección de dependencias**: Para acceder a servicios compartidos

## Seguridad

- **Autenticación**: Implementada mediante tokens JWT (JSON Web Tokens)
- **Sanitización**: Uso de DomSanitizer para prevenir ataques XSS al incrustar contenido externo
- **Guards de Ruta**: Protección de rutas que requieren autenticación
- **Interceptores HTTP**: Añaden tokens de autenticación a las solicitudes salientes

## Despliegue en Railway

La aplicación está desplegada y disponible en [proyectoivv2-production.up.railway.app](https://proyectoivv2-production.up.railway.app).

### Configuración del Despliegue

#### Archivos de Configuración

Para desplegar la aplicación en Railway, se crearon y configuraron los siguientes archivos:

- **Dockerfile**: Configuración para construir la aplicación en un entorno Docker
  ```dockerfile
  # Build stage
  FROM node:18.19 as build
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run build
  
  # Production stage
  FROM node:18.19-slim
  RUN npm install -g serve
  WORKDIR /app
  COPY --from=build /app/dist/proyecto-iv/browser/ .
  EXPOSE 3000
  CMD ["serve", "-s", ".", "-l", "3000"]
  ```

- **railway.toml**: Configuración específica para Railway
  ```toml
  [build]
  nixpacks_enabled = false

  [deploy]
  startCommand = "serve -s . -l 3000"
  restartPolicy = "always"
  healthcheckEnabled = false
  ```

- **environments/environment.prod.ts**: Configuración de entorno para producción
  ```typescript
  export const environment = {
    production: true,
    apiUrl: 'https://apiproyectoiv-production.up.railway.app/api'
  };
  ```

#### Consideraciones Especiales para Angular 19

La estructura de compilación de Angular 19 es diferente a versiones anteriores:
- Los archivos compilados se encuentran en: `dist/[nombre-proyecto]/browser/`
- Es importante ajustar el Dockerfile para copiar desde la ruta correcta

#### Solución a Problemas Comunes

Durante el proceso de despliegue se encontraron y resolvieron varios desafíos:

1. **Problema de estructura de directorios**:
   - Angular 19 coloca los archivos compilados en `/browser/`
   - Solución: Ajustar la ruta de copia en el Dockerfile

2. **Puertos en Railway**:
   - Railway espera que la aplicación escuche en un puerto específico
   - Solución: Exponer y usar el puerto 3000 con la herramienta `serve`

3. **Healthchecks**:
   - Los healthchecks de Railway pueden fallar con configuraciones complejas
   - Solución: Deshabilitar healthchecks en `railway.toml`

4. **Sirviendo una SPA**:
   - Las aplicaciones Angular requieren un servidor que maneje correctamente las rutas
   - Solución: Usar `serve` que está optimizado para aplicaciones SPA

### Proceso de Despliegue

Para desplegar la aplicación desde cero:

1. **Preparar los archivos de configuración**:
   - Crear `Dockerfile`, `railway.toml` y verificar `environment.prod.ts`

2. **Instalar Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

3. **Iniciar sesión en Railway**:
   ```bash
   railway login
   ```

4. **Inicializar y desplegar**:
   ```bash
   railway init
   railway up
   ```

5. **Verificar el despliegue**:
   ```bash
   railway open
   ```

### Conexión con la API

La aplicación desplegada se conecta automáticamente a la API en:
```
https://apiproyectoiv-production.up.railway.app/api
```

Esta URL está configurada en el archivo `environment.prod.ts` y se utiliza automáticamente en el entorno de producción.

### Mantenimiento del Despliegue

Para actualizar la aplicación desplegada:

1. Realizar cambios en el código
2. Hacer commit de los cambios
3. Ejecutar `railway up` para redesplegue
4. Verificar el despliegue con `railway logs`

Para más detalles sobre Railway, consultar su [documentación oficial](https://docs.railway.app/).
