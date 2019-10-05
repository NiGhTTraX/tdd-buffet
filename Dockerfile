FROM node:slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Since this is a monorepo we need to copy all the package.json files.
RUN mkdir -p \
  packages/tdd-buffet \
  packages/react \
  packages/visual \
  packages/selenium
COPY packages/tdd-buffet/package.json packages/tdd-buffet/package.json
COPY packages/react/package.json packages/react/package.json
COPY packages/visual/package.json packages/visual/package.json
COPY packages/selenium/package.json packages/selenium/package.json
COPY package.json yarn.lock ./
RUN yarn

COPY . .
