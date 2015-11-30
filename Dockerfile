FROM ubuntu:14.04

RUN  apt-get update \
     && apt-get -y upgrade \
     && apt-get install -y build-essential software-properties-common openssl libssl-dev pkg-config git git-core wget curl python automake libtool libfontconfig ruby-full vim

RUN mkdir -p /var/www/app
WORKDIR /var/www/app
ADD . /var/www/app

ENV NODE_VERSION 5.1.0 
RUN wget -O - http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz \
    | tar xzf - --strip-components=1 --exclude="README.md" --exclude="LICENSE" \
    --exclude="ChangeLog" -C "/usr/local" \
    && npm config set registry http://registry.npmjs.org/ \
    && npm cache clean \
    && npm install --no-optional \
    && npm run dist \
    && npm install forever -g

EXPOSE 3000
ENV PORT 3000
