FROM node:slim

CMD [ "npm", "start" ]
EXPOSE 3001
# Force production mode for the app
ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public ./public
COPY src ./src
RUN npm run build && rm -rf public src

COPY index.js dal.js ./
