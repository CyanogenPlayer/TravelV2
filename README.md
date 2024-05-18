# Getting Started
### You need to configure .env files before start:
####  - Docker .env file must be created in a root of project
####  - SpringBoot app .env file location `src/main/resources`
### `mvn clean package -Dmaven.test.skip=true` - to build SpringBoot app without tests
### `npm run watch` - to track changes and automatically build a ReactTS app
### `docker compose up` - to setup Docker
### `docker compose up --build` - to setup Docker with build(use this after making changes to SpringBoot app)
