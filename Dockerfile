FROM node:latest AS node_builder
RUN ls
ADD . .
RUN ls
RUN npm install
RUN npm run build
RUN ls
RUN npm install -g serve
RUN npm install universal-cookie
CMD serve -s build
