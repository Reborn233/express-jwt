FROM node:8

# Create app directory
RUN mkdir -p /code
WORKDIR /code

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Install app dependencies
COPY package.json /code/
RUN npm install

# Bundle app source
COPY ./bin /code/
COPY ./public /code/
COPY ./routes /code/
COPY ./middlewares /code/
COPY ./tools /code/
COPY ./views /code/
COPY ./app.js /code/
COPY ./config.js /code/

EXPOSE 8080
CMD ["npm", "start"]
