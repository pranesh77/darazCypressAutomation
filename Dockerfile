FROM cypress/included:7.1.0

RUN mkdir /app 

WORKDIR /app

COPY cypress /app/cypress
COPY cypress.json /app/cypress.json
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm i @testing-library/cypress