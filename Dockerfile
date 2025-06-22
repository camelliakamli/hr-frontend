# Stage 1: Build docker image for the React app
FROM node:20 AS builder  
#technically start with a base image; we start from node image

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json .
#Copies package.json and package-lock.json from project to the container
RUN npm install

# Copy the rest of code
COPY . .
#Copies all files from local project folder into the container’s /app directory.

#Build the app
RUN npm run build

# Stage 2: Serve the React app with Nginx <=> copy react app build above in nginx

FROM nginx:alpine
# Nginx is used to serve the final build/ folder after building
# alpine Minimize Docker image size and improve performance

COPY --from=builder /app/dist /usr/share/nginx/html  

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# command to run nginx