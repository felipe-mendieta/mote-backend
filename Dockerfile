# Use a specific version of node:alpine for a more predictable environment
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install node dependencies
# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./
RUN npm install --production

# Copy the rest of your application code after npm install
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
