FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY index.js .
COPY controllers controllers/
COPY routes routes/
COPY models models/
COPY config config/

EXPOSE 4000

CMD [ "node", "index.js" ]
