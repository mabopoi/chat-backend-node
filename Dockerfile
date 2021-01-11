FROM node:14-alpine 

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install --production 

COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]
