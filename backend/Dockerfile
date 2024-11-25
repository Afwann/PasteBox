FROM node:20
WORKDIR /app
COPY package*.json ./
# RUN npm update
RUN npm install
# RUN npm rebuild bcrypt --build-from-source
COPY . .
EXPOSE 5555
# ENV NODE_ENV=development

CMD ["npm","run","dev"]
