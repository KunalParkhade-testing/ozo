### Multi-stage build: build with Node, serve with Nginx
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies (use npm ci for reproducible builds)
COPY package.json package-lock.json* ./
RUN npm ci --silent --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

### Production image
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Note: we do not copy the repo-level nginx config here because the Docker
# build context is `./frontend` in CI. If you want to use a custom nginx
# configuration, build with context=`.` or include the config inside the
# `frontend/` directory.

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
