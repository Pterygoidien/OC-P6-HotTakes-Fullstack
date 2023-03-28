FROM node:18.15

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 4200

ENV HOST = 0.0.0.0
ENV PORT = 4200
ENV PROXI_API=$PROXI_API


CMD [ "npm", "start" ]