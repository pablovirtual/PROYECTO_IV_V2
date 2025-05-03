# Etapa de compilación
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
# Copiar la configuración de nginx personalizada si es necesario
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copiar los archivos compilados desde la etapa de construcción
COPY --from=build /app/dist/proyecto-iv /usr/share/nginx/html
# Exponer el puerto 80
EXPOSE 80
# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
