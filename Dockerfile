FROM node:16 

RUN apt-get update && \
    apt-get -y upgrade 

WORKDIR /rest_typescript

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 4001

CMD ["npm", "run", "dev"]