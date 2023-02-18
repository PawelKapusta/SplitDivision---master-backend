# Use the official Node.js image as the base image
FROM node:16-alpine

ENV MY_VAR=myvalue
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]