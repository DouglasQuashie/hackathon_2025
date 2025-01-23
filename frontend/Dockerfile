FROM node:lts-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production YARN_VERSION=4.6.0
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

FROM base AS builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build
EXPOSE 3000
CMD ["yarn", "serve", "dist"]