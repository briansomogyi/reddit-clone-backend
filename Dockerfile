# Use Node.js official image
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./
# COPY --from=dependencies /root/.yarn /root/.yarn

# Install dependencies
RUN corepack enable yarn
RUN corepack install -g yarn@4.6.0
RUN yarn -v
RUN yarn cache clean --all
RUN yarn install --immutable
RUN yarn bin

# Copy the entire backend code
COPY . .

# Expose the port the server runs on
EXPOSE 5000

# Run the server
CMD ["yarn", "dev"]
