FROM node:8 as builder

# create a work directory inside the container
RUN mkdir /service
WORKDIR /service

COPY . .

RUN yarn install

ENV SHELL=/bin/bash

# install utilities
RUN npm install -g ts-node