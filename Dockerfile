# Use Node.js 22 LTS version
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Environment variables
ENV NODE_ENV=development

# Default command for development (can be overridden in docker-compose)
CMD ["./entrypoint.sh"]
