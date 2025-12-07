# Use a Debian-based image for easier dependency installation
FROM node:18-bookworm-slim

# Install FFmpeg and LibreOffice
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libreoffice \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production --no-optional

# Copy application files
COPY . .

# Create directories for uploads and converted files
RUN mkdir -p uploads converted

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]