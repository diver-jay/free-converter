FROM node:18-alpine

# Install FFmpeg
RUN apk add --no-cache ffmpeg

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application files
COPY . .

# Create directories for uploads and converted files
RUN mkdir -p uploads converted

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]
