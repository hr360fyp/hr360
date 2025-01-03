FROM node:16

WORKDIR /app

COPY server/package.json ./package.json

RUN npm install

COPY server/ .

EXPOSE 3000

CMD ["npm", "start"]
