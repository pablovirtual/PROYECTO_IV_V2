# Build stage
FROM node:18.19 as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Use smaller image for production
FROM node:18.19-slim

# Install serve - a simple static file server
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built application from build stage
COPY --from=build /app/dist/proyecto-iv .

# Expose port 3000 (default for serve)
EXPOSE 3000

# Start serve
CMD ["serve", "-s", ".", "-l", "3000"]
