# The base image is a machine already configured with the latest nodejs
FROM node:slim

# When the container starts, run the start script in the package.json file
CMD [ "npm", "start" ]
# This is the port on which the app will be working
EXPOSE 3001
# Force production mode for the app so that React builds in production mode
ENV NODE_ENV=production
# All of the files of the app will be located in this folder
WORKDIR /app
# Copy only the package.json and the package-lock.json files into the image so that we can install
# the dependencies
COPY package.json package-lock.json ./
# Every RUN command in the docker file creates a layer, all layers are cached and as a good practice
# we should separate the image on layers that will be rarely changed, so that next image builds take
# advantage on the cached layers. Note that if a previous layer is changed, the next ones will be
# re-built again so the Dockerfile RUN commands should be sorted by the least changing layers first
#
# In this case we're caching the package installation so that next builds only execute the next RUN
# commands
RUN npm install

# Copy the public folder into the image
COPY public ./public
# Copy the src folder into the image
COPY src ./src
# In another layer, execute the build script of the package.json file (Which will build the React
# frontend) and then remove the source files so that the final image is as small as possible
RUN npm run build && rm -rf public src

# Then copy the backend files
COPY index.js dal.js ./
