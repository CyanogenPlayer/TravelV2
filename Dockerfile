FROM openjdk:17-alpine

MAINTAINER Nazarii Ryhus

RUN apk add bash

RUN mkdir /app
WORKDIR /app

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh