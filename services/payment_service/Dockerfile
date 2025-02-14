FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g nodemon && npm install
COPY . .
ENV NODE_ENV=dev
CMD ["npm", "run", "dev"]
