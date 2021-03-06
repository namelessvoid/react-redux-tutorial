FROM node:9.6.1 as builder

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build

FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]