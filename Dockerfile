FROM node
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install
COPY . .
RUN tsc
EXPOSE 4000
CMD ["npm", "run", "dev"]