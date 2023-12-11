# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
#COPY package*.json ./

# Install dependencies
RUN npm install -g pm2
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code to the container
COPY . .
EXPOSE 3000
# Set environment variables
ENV NEXT_PUBLIC_API_URL=https://a1quest-api-production.up.railway.app/api/v1
ENV NEXT_PUBLIC_SESSION_NAME="A1Quest_Admin"
ENV NEXT_PUBLIC_SESSION_KEY=A!Quest_AD_MIN
ENV NEXT_PUBLIC_TOKEN_NAME="A1Quest Admin"
ENV NEXT_PUBLIC_TOKEN_KEY=A1_AD_QUE_TOK_KEY
CMD ["pm2-runtime", "yarn", "start"]


# Build the Next.js application


# Expose the port that the application will run on

# Start the Next.js application

