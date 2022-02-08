FROM node:12-slim

WORKDIR /usr/src/colophon

RUN apt-get update
RUN echo y | apt-get install git
RUN npm install --save firebase
RUN npm install -g firebase-tools
RUN npm install -g @angular/cli

COPY ./ ./

RUN echo N | npm i

EXPOSE 4200