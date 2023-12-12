FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install a specific version of npm globally
RUN npm install -g npm@7

# Install PM2 globally
RUN npm install -g pm2

# Install Yarn globally
#RUN npm install -g yarn

# Copy package.json and yarn.lock to the container
COPY package*.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables
ENV REACT_APP_API_URL=http://api-dev.a1quest.com/api/v1
ENV REACT_APP_SESSION_NAME="A1Quest_Admin"
ENV REACT_APP_SESSION_KEY=A!Quest_AD_MIN
ENV REACT_APP_TOKEN_NAME="A1Quest Admin"
ENV REACT_APP_TOKEN_KEY=A1_AD_QUE_TOK_KEY

# Build the React app
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Start the React app with PM2
CMD ["yarn", "start"]
