# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the application
# The standalone output will be in .next/standalone
RUN npm run build

# Stage 2: Create the production image from the standalone output
FROM node:18-alpine AS runner

WORKDIR /app

# Copy the standalone build from the builder stage
COPY --from=builder /app/.next/standalone ./

# Copy the static and public assets
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# The Next.js server will run on port 3000 by default
EXPOSE 3000

# Set the environment variable for the port
ENV PORT 3000

# Start the Next.js server
CMD ["node", "server.js"]