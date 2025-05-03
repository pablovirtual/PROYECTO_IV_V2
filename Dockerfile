# Etapa de compilación
FROM node:20-alpine as build
WORKDIR /app

# Copiamos primero solo los archivos de configuración del proyecto
COPY package*.json ./
COPY angular.json tsconfig*.json ./

# Instalamos dependencias con una bandera de mayor compatibilidad
RUN npm ci --quiet

# Copiamos el resto del código fuente
COPY . .

# Generamos la versión compilada para producción
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Eliminamos los archivos predeterminados de Nginx
RUN rm -rf ./*

# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos compilados
COPY --from=build /app/dist/proyecto-iv .

# Comando para el inicio de Nginx
CMD ["nginx", "-g", "daemon off;"]
