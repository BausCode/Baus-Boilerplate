FROM ubuntu:14.04

RUN  apt-get update \
     && apt-get -y upgrade \
     && apt-get install -y build-essential software-properties-common openssl libssl-dev pkg-config git git-core curl automake libtool libfontconfig

RUN mkdir -p /var/www/dist
WORKDIR /var/www/dist
ADD . /var/www/dist

ENV NODE_VERSION 6.3.0
RUN curl http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz \
    | tar xvzf - --strip-components=1 --exclude="README.md" --exclude="LICENSE" --exclude="ChangeLog" -C "/usr/local" \
    && npm config set registry http://registry.npmjs.org/ \
    && npm cache clean \
    && npm install -g babel babel-cli node-gyp --no-optional \
    && npm install --no-optional --unsafe-perm

EXPOSE 8080
ENV PORT 8080
