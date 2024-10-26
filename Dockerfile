# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "dev"]


# for production use this --> 

# # Use Node.js 18 LTS
# FROM node:18-alpine

# # Set working directory
# WORKDIR /app

# # Copy package.json and pnpm-lock.yaml
# COPY package.json pnpm-lock.yaml ./ 

# # Install dependencies
# RUN npm install -g pnpm && pnpm install

# # Copy the rest of the project files
# COPY . .

# # Build the Next.js app for production
# RUN pnpm build

# # Expose port 3000 for the production server
# EXPOSE 3000

# # Start the production Next.js app
# CMD ["pnpm", "start"]
