FROM node:13.12.0-alpine3.10

RUN mkdir ui

WORKDIR /ui 

COPY package.json /ui/package.json

RUN npm i

COPY . /ui

RUN npm run build

CMD ["npm", "start"]