# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY frontend/. .

# Build the React app
RUN npm run build

# Expose the port the frontend runs on
EXPOSE 5173

# Serve the React app
CMD ["npm", "run","dev"]