# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

ARG VITE_REACT_APP_URL
ARG VITE_AMPLITUDE_KEY
ARG VITE_MAPBOX_ACCESS_TOKEN
ARG VITE_REACT_APP_CLIENT_URL

ENV VITE_REACT_APP_URL=$VITE_REACT_APP_URL
ENV VITE_AMPLITUDE_KEY=$VITE_AMPLITUDE_KEY
ENV VITE_MAPBOX_ACCESS_TOKEN=$VITE_MAPBOX_ACCESS_TOKEN
ENV VITE_REACT_APP_CLIENT_URL=$VITE_REACT_APP_CLIENT_URL

RUN yarn build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html 