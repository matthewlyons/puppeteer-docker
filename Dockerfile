FROM ghcr.io/puppeteer/puppeteer:19.7.2

USER root

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/app

COPY package*.json ./
RUN npm i
COPY . .
CMD [ "node", "index.js" ]

