FROM node:latest AS node_builder
WORKDIR "/frontend"
RUN ls
ADD frontend .
RUN ls
RUN npm install
RUN ls
CMD npm run start