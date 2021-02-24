FROM node:14.6.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "local"]
