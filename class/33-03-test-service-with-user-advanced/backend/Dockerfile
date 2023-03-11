FROM node:latest

WORKDIR /myfolder/

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/

RUN yarn install 

COPY . /myfolder/

CMD yarn start:dev