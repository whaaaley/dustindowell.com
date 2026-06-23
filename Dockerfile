# Stage 1: build the static site with vite-ssg.
# devDependencies hold vite/vite-ssg/plugins, so do not omit them.
FROM node:22-alpine AS builder

WORKDIR /app/client

# Copy manifests first so the install layer caches when only source changes.
COPY client/package.json client/package-lock.json ./
RUN npm ci

# Copy the rest of the client source and build to dist/.
COPY client/ .
RUN npm run build

# Stage 2: serve dist/ with a small Deno static server.
FROM denoland/deno:alpine-2.7.14

WORKDIR /app/server

COPY server/deno.json ./
RUN deno install

COPY server/index.ts ./
COPY --from=builder /app/client/dist ./dist
RUN deno cache index.ts

ENV PORT=8080
EXPOSE 8080

CMD ["task", "start"]
