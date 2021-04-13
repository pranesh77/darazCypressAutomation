FROM cypress/included:7.0.1

WORKDIR /app

COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json


RUN npx cypress run