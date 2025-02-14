FROM node:alpine

WORKDIR /front-end

COPY package*.json ./
RUN npm install -g nodemon && npm install

COPY . .

CMD ["npm", "run", "start"]
