FROM node:16 AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --production --ignore-scripts

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 9000
CMD [ "npm", "run", "start:prod" ]
