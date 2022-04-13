FROM node:latest AS node_builder
WORKDIR "/frontend"
RUN ls
ADD frontend .
RUN ls
RUN npm install
# RUN npm run build
RUN ls
RUN npm run build
RUN ls
CMD npm run start
# npm install -g serve