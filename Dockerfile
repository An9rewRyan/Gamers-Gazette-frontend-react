FROM node:latest AS node_builder
RUN ls
ADD . .
RUN ls
RUN npm install
RUN npm run build
RUN ls
RUN npm install -g serve
CMD serve -s build
