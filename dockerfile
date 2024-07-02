# Use the official Node.js 18 Alpine image as base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the contents of the local 'dist' directory to the container
COPY . /app

# Install http-server globally
RUN yarn global add http-server

# Expose port 5173
EXPOSE 5173

# Start http-server to serve the 'dist' folder
CMD ["http-server", "-g", "-d", "false"]
