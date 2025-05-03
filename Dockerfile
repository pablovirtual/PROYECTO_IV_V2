# Build stage
FROM node:18.19 as build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Debug: ver estructura antes de compilar
RUN ls -la 

# Build the application
RUN npm run build

# Debug: ver estructura de salida después de compilar
RUN ls -la dist && ls -la dist/proyecto-iv

# Production stage
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage - usamos copiado recursivo
COPY --from=build /app/dist/proyecto-iv/ ./

# Debug: verificar estructura después de copiar
RUN ls -la

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
