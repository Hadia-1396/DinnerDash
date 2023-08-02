
FROM node

RUN mkdir -p /DinnerDash/client
WORKDIR /Devsinc Projects/Test Project/dinnerdash/client

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
