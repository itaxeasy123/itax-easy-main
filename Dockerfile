# Stage 1: Install dependencies with Node 16
FROM node:16-alpine AS dependencies

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with Node 16
RUN npm ci --legacy-peer-deps

# Stage 2: Build the application with Node 16
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies from previous stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application files
COPY . .

# Generate Prisma client before building
RUN npx prisma generate

# Accept build arguments for Next.js public environment variables
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_BACK_URL
ARG NEXT_PUBLIC_PAY_URL
ARG NEXT_PUBLIC_BLAZ_URL
ARG NEXT_PUBLIC_MOM_ITAX_URL
ARG NEXT_PUBLIC_LARAVEL_ITAX_URL
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_RAZORPAY_KEY_ID
ARG NEXT_PUBLIC_WEB_TOKEN

# Set them as environment variables for the build
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACK_URL=$NEXT_PUBLIC_BACK_URL
ENV NEXT_PUBLIC_PAY_URL=$NEXT_PUBLIC_PAY_URL
ENV NEXT_PUBLIC_BLAZ_URL=$NEXT_PUBLIC_BLAZ_URL
ENV NEXT_PUBLIC_MOM_ITAX_URL=$NEXT_PUBLIC_MOM_ITAX_URL
ENV NEXT_PUBLIC_LARAVEL_ITAX_URL=$NEXT_PUBLIC_LARAVEL_ITAX_URL
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_RAZORPAY_KEY_ID=$NEXT_PUBLIC_RAZORPAY_KEY_ID
ENV NEXT_PUBLIC_WEB_TOKEN=$NEXT_PUBLIC_WEB_TOKEN

# Build Next.js application
RUN npm run build

# Stage 3: Run the application with Node 18
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy necessary files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/prisma ./prisma

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
