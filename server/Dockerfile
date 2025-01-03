# Use Node.js 16 as the base image
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
