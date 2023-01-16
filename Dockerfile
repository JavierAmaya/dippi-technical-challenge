FROM node:alpine

WORKDIR /app
COPY /db-service/package*.json ./
COPY /db-service/prisma ./prisma/
COPY /db-service/.env ./
COPY /db-service/tsconfig.json ./
COPY . .
RUN yarn install
RUN npx prisma generate
EXPOSE 3000
CMD yarn start 