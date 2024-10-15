FROM node:18.17.1

WORKDIR /usr/src/app
COPY . ./
EXPOSE 3000
RUN ["npm", "i"]
RUN ["npm", "run", "start"]
