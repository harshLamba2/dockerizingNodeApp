In the simplest terms, a Docker image is like a blueprint or template for creating a container. It contains everything your application needs to run, including the code, libraries, dependencies, and system settings. Think of it like a snapshot of your app and its environment
Docker image = Blueprint for containers.
Container = Running instance of that blueprint.

1. Install Docker (If your Windows PC has a traditional 64-bit Intel or AMD processor (x86_64), you should download Docker Desktop for Windows - x86_64.)
2. Check Version (docker --version)
3. Create a small Node js Project/ Setup



C:.
|───node_modules
|-app.js
|-package-lock.json
└-package.json


4. create a Dockerfile in the directory 
C:.
|───node_modules
|-app.js
|-Dockerfile
|-package-lock.json
└-package.json

{
1. Create the Dockerfile: If you haven't already, create a file named Dockerfile in your project directory.

2. Fill in the Dockerfile: Add the appropriate instructions to the Dockerfile. Here’s a basic outline you might follow for a Node.js application:

# base image{ <!--FROM node:20: This line specifies the base image for your Docker image. It uses the official Node.js version 20 image from Docker Hub. This image contains everything needed to run a Node.js application, including the Node.js runtime and npm package manager. -->
# Use the official Node.js 20 runtime as a parent image
FROM node:20
}

# working directory { <!-- This sets the working directory inside the Docker container to /usr/src/app. Any subsequent commands (like COPY, RUN, and CMD) will be executed from this directory. If the directory doesn't exist, it will be created.-->
<!-- The working directory in Docker (set by the WORKDIR instruction) is simply the default directory where commands are run inside the container. It is not a "central file" but rather a folder (directory) within the container's filesystem. -->
<!-- If you specify WORKDIR /usr/src/app in your Dockerfile, this means that when the container is running, all commands (like npm install, npm start, etc.) will be executed relative to /usr/src/app. -->
# Set the working directory in the container
WORKDIR /usr/src/app  <!-- use usr instead of user-->
}

# copy package file { <!-- This copies both package.json and package-lock.json files from your local directory into the current working directory in the container (/usr/src/app). These files contain the metadata and dependencies for your Node.js application. -->
# Copy package.json and package-lock.json files
COPY package*.json ./
}

# install dependencies{ <!-- RUN npm install: This command runs npm install to install all the dependencies listed in package.json. It creates a node_modules directory inside the container that contains all the required packages for your application. -->
# Install dependencies
RUN npm install
}

# coppy application file{ <!--  This copies all files and directories from your local directory into the current working directory of the container (/usr/src/app). This includes your application code, assets, and other necessary files. -->
# Copy the rest of your application files
COPY . .
}

# expose PORT { <!-- This informs Docker that the container will listen on port 3000 at runtime. It doesn't publish the port; you still need to map it when running the container (e.g., using -p 3000:3000). This is useful for connecting to your app from the host machine or other containers -->
<!-- using the EXPOSE instruction in your Dockerfile will not make your Node.js app automatically listen on port 3000. You need to explicitly define that behavior in your Node.js application code. -->
<!-- const PORT = 3000;  -->
<!-- Yes, you can definitely expose a different port for your Node.js application, such as port 8081! Here’s -->
# Expose the port your app runs on
EXPOSE 8081
}

# command to run the application{ <!-- This specifies the command that should be run when the container starts. In this case, it runs npm start, which typically launches your application (as defined in your package.json). -->
# Define the command to run your app
CMD ["npm", "start"]
}

}


5. run cmd: docker build -t my-node-app .  <!-- repository name must be lowercase -->
> "docker build" tells Docker to create an image.
> "-t my-node-app" assigns a tag (name) to the image (my-node-app in this case).
> "." at the end tells Docker to use the current directory for the Dockerfile and other files.

6. docker run -p 3000:3000 my-node-app
> -p 3000:3000 maps port 3000 on your computer to port 3000 inside the container. This allows you to access your app from http://localhost:3000.
> my-node-app is the name of the image you just built.
Open your web browser and go to http://localhost:3000 to see your running app.





# MY SETUP

Dockerfile:
            FROM node:20
            WORKDIR /usr/src/app
            COPY package*.json ./
            RUN npm install
            COPY . .
            EXPOSE 8081
            CMD ["npm", "start"]


# COMMAND LINE
            docker build -t first-dockerized-node-app .
            docker run -p 8081:8081 first-dockerized-node-app

# CHECK RUNNING CONTAINERS --docker ps is used to list all the currently running Docker containers on your system
docker ps

# STOP RUNNING CONTAINER
docker stop <container_id>  <!-- Container ID can be obtained with docker ps comand -->


# INCORPORATING CHANGES -- have to rebuild the image probably with the same tag name






Optional: Dockerize with docker-compose:
If your app has dependencies like a database, create a docker-compose.yml file to define multiple services:

version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development

RUN CMD: docker-compose up