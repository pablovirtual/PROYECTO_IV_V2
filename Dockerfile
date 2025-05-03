# Build stage
FROM node:18 as build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Check directory structure before build
RUN ls -la

# Build the application
RUN npm run build

# Check structure after build
RUN ls -la dist && echo "Checking output directory structure"

# Nginx stage
FROM nginx:1.21

# Create directory for html files
RUN mkdir -p /usr/share/nginx/html

# Copy from build stage, being specific about the path
COPY --from=build /app/dist/proyecto-iv/ /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
