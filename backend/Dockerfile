FROM oven/bun as base

FROM base AS builder

WORKDIR /app

COPY package*json tsconfig.json src ./
COPY ./prisma ./prisma

RUN bun install;

COPY . .

RUN bun run build;

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/build /app/build
COPY --from=builder --chown=hono:nodejs /app/prisma /app/prisma
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 3000

CMD ["bun", "run", "prod:docker"]
