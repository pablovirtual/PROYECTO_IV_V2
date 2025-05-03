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

La aplicación está configurada para ser desplegada en [Railway](https://railway.app), una plataforma moderna de despliegue en la nube. A continuación se detallan los archivos de configuración y los pasos para el despliegue:

### Archivos de Configuración

- **Dockerfile**: Configura un proceso de construcción de dos etapas:
  - Etapa de construcción: Compila la aplicación Angular
  - Etapa de producción: Sirve la aplicación con Nginx
- **nginx.conf**: Configuración optimizada de Nginx para aplicaciones Angular
- **.dockerignore**: Excluye archivos innecesarios de la imagen Docker
- **railway.toml**: Configuración específica para Railway

### Pasos para el Despliegue

1. **Instalar la CLI de Railway**:
   ```
   npm install -g @railway/cli
   ```

2. **Iniciar sesión en Railway**:
   ```
   railway login
   ```

3. **Inicializar el proyecto en Railway**:
   ```
   railway init
   ```

4. **Desplegar la aplicación**:
   ```
   railway up
   ```

5. **Abrir la aplicación en el navegador**:
   ```
   railway open
   ```

### Variables de Entorno

Railway utiliza las variables de entorno definidas en los archivos de entorno de Angular durante el proceso de construcción. La configuración de producción utiliza automáticamente `environment.prod.ts` que apunta a la API en:
```
https://apiproyectoiv-production.up.railway.app/api
```

### Notas Importantes

- La aplicación utiliza Nginx para servir el contenido estático y redirigir todas las rutas a index.html para compatibilidad con Angular Router
- El despliegue está configurado para reiniciarse automáticamente en caso de fallos
- Se ha configurado compresión gzip y políticas de caché para optimizar el rendimiento
