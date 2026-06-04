FROM node:18-alpine

WORKDIR /app

# Puppeteer butuh Chromium — install dulu
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Arahkan Puppeteer ke Chromium bawaan Alpine
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000
CMD ["node", "src/server.js"]