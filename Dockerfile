FROM node:latest AS node_builder
ADD . .
RUN ls
RUN npm install
RUN npm list
RUN ls
CMD npm run start