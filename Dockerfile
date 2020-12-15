# Stage 1 - the build process
FROM node:12 as builder
WORKDIR /src/usr/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
# Stage 2 - the production environment
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=builder /src/usr/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]