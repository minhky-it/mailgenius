FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g nodemon pm2 && npm install
COPY . .
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
