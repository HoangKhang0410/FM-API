FROM node
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install
RUN npm run build
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]