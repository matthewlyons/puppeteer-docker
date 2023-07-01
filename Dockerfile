FROM ghcr.io/puppeteer/puppeteer:19.7.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/app

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "index.js" ]

