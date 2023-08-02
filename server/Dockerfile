FROM node

RUN mkdir -p /DinnerDash/server
WORKDIR /Devsinc Projects/Test Project/dinnerdash/server

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3001

CMD ["node", "index.js"]

