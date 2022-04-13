FROM node:latest AS node_builder
RUN ls
ADD . .
RUN ls
RUN npm install
RUN ls
CMD npm run start