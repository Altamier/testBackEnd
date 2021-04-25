FROM node:14

COPY src src/
COPY package.json /.
 
RUN npm install

EXPOSE 3000

CMD ["node", "src/server/server.js"]
