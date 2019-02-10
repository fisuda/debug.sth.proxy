FROM ubuntu:16.04
WORKDIR /
COPY package.json /
RUN apt-get update -y && \
    apt-get install -y curl gnupg2 && \
    curl -sL https://deb.nodesource.com/setup_9.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/* && \
    npm install
COPY server.js /
CMD node server.js
