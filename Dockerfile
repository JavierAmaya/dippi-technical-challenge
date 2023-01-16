FROM node:alpine

WORKDIR /app

# COPY package.json and package-lock.json files
COPY /db-service/package*.json ./

# generated prisma files
COPY /db-service/prisma ./prisma/

# COPY ENV variable
COPY /db-service/.env ./

# COPY tsconfig.json file
COPY /db-service/tsconfig.json ./

# COPY
COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3000

CMD yarn start

