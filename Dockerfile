FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

# Install production dependencies using Yarn
RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start"]
