# Use Node.js official image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire backend code
COPY . .

# Expose the port the server runs on
EXPOSE 5000

# Run the server
CMD ["yarn", "dev"]
