FROM node:16 AS builder
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 9000
RUN apk --no-cache add curl jq
CMD [ "npm", 'run', 'start:prod' ]
