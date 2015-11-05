FROM ubuntu:14.04

RUN  apt-get update \
     && apt-get -y upgrade \
     && apt-get install -y build-essential software-properties-common openssl libssl-dev pkg-config git git-core wget curl python automake libtool libfontconfig ruby-full vim

ENV NODE_VERSION 5.0.0 
RUN wget -O - http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz \
    | tar xzf - --strip-components=1 --exclude="README.md" --exclude="LICENSE" \
    --exclude="ChangeLog" -C "/usr/local" \
    && npm config set registry http://registry.npmjs.org/ \
    && npm install -g forever nodemon bower grunt-cli --no-optional

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

ADD . /var/www/app

#RUN gem install bundler \
#    && bundle install

RUN npm cache clean \
    && npm install --no-optional --verbose

#RUN bower install --allow-root

EXPOSE 3000
ENV PORT 3000
