FROM node

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i

COPY . .

EXPOSE 8080

CMD ["node","index.js"]