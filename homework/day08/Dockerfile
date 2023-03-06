FROM node:16

WORKDIR /day08/

COPY ./package.json /day08/
COPY ./yarn.lock /day08/

RUN yarn install

COPY . /day08/

CMD yarn dev
