# Dockerfile
# Stage 1: Build React App
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies files
COPY package.json package-lock.json ./
RUN npm install

# Copy all project files
COPY . .

# Build React app
RUN npm run build

# Stage 2: Run using Nginx
FROM nginx:alpine

# Copy built files to Nginx public directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
