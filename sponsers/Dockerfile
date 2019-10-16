FROM node:10

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

# Bundle app source
COPY src src/

RUN npm run build

EXPOSE 4000

CMD [ "node", "dist/index.js" ]
