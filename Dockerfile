FROM node:12
WORKDIR /
COPY package*.json ./

RUN npm install -s
COPY . .

RUN npm run-script build

EXPOSE 80
CMD [ "node", "server.js" ]
