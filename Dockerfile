FROM node:slim

RUN apt-get update
RUN apt-get install -y ffmpeg
RUN mkdir /app

WORKDIR /app
COPY app.js /app
COPY package.json /app

RUN npm install

CMD ["npm", "run", "production"]

EXPOSE 1935
EXPOSE 8000