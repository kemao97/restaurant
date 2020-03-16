FROM node:8.17

WORKDIR /usr/src/api
ADD package.json package-lock.json ./
RUN npm install

ADD . .
CMD ["./entrypoint.sh"]
