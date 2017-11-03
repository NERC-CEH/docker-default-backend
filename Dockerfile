FROM node:8.9.0-alpine

LABEL maintainer "gareth.lloyd@stfc.ac.uk"

ARG VCS_REF
ARG BUILD_DATE

# Metadata
LABEL org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="https://github.com/NERC-CEH/docker-default-backend" \
      org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.docker.dockerfile="/Dockerfile"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app
RUN yarn install --silent

COPY src /usr/src/app/src
RUN yarn dist

RUN yarn install --silent --production && yarn cache clean

EXPOSE 8000

CMD ["node", "dist/server.js"]
