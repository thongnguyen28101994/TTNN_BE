FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

COPY .env ./dist/
COPY ssl ./dist/ssl

WORKDIR /app/dist/

# RUN node src/index.js

CMD ["node","src/index.js"]

# # stage 2
# FROM nginx:lts-alpine

# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 3002
# CMD ["/usr/sbin/nginx", "-g", "daemon off;"]