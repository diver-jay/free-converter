# Use a Debian-based image for easier dependency installation
FROM node:18-bookworm-slim

# Install FFmpeg, LibreOffice, Python, and Korean fonts
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libreoffice \
    curl \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    fonts-nanum \
    fonts-nanum-coding \
    fonts-noto-cjk \
    && fc-cache -fv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python packages for PDF to DOCX conversion
RUN pip3 install --no-cache-dir pdf2docx --break-system-packages

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production --no-optional

# Copy application files
COPY . .

# Create directories for uploads, converted files, and logs
RUN mkdir -p uploads converted logs

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]