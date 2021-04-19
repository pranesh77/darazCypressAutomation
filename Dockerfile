FROM cypress/included:7.0.1

RUN mkdir /app 

# install plugins
RUN npm i @testing-library/cypress 


WORKDIR /app

COPY cypress /app/cypress
COPY cypress.json /app/cypress.json
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

