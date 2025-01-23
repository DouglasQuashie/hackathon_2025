FROM oven/bun as base
WORKDIR /app
COPY . .
RUN bun install && bun run build
EXPOSE 3000
CMD ["bun", "serve", "dist"]