# Use official Node.js LTS image
FROM node:20-slim

# Install system dependencies required by Chromium/Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    fonts-noto-color-emoji \
    fonts-noto-cjk \
    libappindicator3-1 \
    libasound2 \
    libdrm2 \
    libgbm-dev \
    xdg-utils \
    wget \
    gnupg \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Tell Puppeteer to skip downloading Chrome — use system Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install Node.js dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Create required directories
RUN mkdir -p logs sessions screenshots metrics user_data

# Create non-root user for security
RUN groupadd -r automation && useradd -r -g automation -G audio,video automation \
    && chown -R automation:automation /app

USER automation

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('./utils/logger')" || exit 1

CMD ["node", "index.js"]
