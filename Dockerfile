# syntax=docker/dockerfile:1

# Stage 1: build the static site with vite-ssg.
# devDependencies are required (vite, vite-ssg, plugins live there), so do not
# pass --omit=dev. The basic-ssl plugin only runs on the dev server, so the
# production build needs no certs.
FROM node:22-alpine AS builder

WORKDIR /app

# Copy manifests first so the install layer caches when only source changes.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and build to dist/.
COPY . .
RUN npm run build

# Stage 2: serve dist/ with nginx.
FROM nginx:alpine AS runtime

# Replace the default site config with the SPA/nested-route config.
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/dustindowell.conf

# Copy the built static files into the nginx web root.
COPY --from=builder /app/dist /usr/share/nginx/html

# Matches listen 8080 in nginx.conf and internal_port in fly.toml.
EXPOSE 8080

# nginx:alpine already runs `nginx -g 'daemon off;'` as its default CMD.
