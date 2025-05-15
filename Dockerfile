# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Debug: Check the output structure
RUN ls -la dist && ls -la dist/proyecto-iv && echo "Checking if browser dir exists" && ls -la dist/proyecto-iv/browser || echo "Browser dir not found"

# Production stage
FROM node:18.19-slim

# Install serve - a simple static file server
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built application from build stage - adjusted for Angular 19's structure
COPY --from=build /app/dist/proyecto-iv/browser/ .

# Expose port 3000
EXPOSE 3000

# Start serve with the correct base path
CMD ["serve", "-s", ".", "-l", "3000"]
