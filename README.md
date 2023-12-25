# Foodbyte API Service

Backend API Service for Foodbyte Application

- Version 1.0.0

#### Entities

- User

### Deliverable Content

#### Implementation

HEALTH

- **GET** `{baseURL}/api` - Checks the health of the system

USER

- **POST** `{baseURL}/api/v1/users` - creates a new user
- **GET** `{baseURL}/api/v1/users/{id}` - Returns user
- **GET** `{baseURL}/api/v1/users` - Returns all users
- **PATCH** `{baseURL}/api/v1/users/{id}` - Updates a user
- **DELETE** `{baseURL}/api/v1/users/{id}` - Delete a user

## How do I get set up?

### << Docker Compose >>

To run the project locally using docker;

- `docker compose up --detach --wait`

To tear down:

- `docker compose down --remove-orphans`

### Developer Setup

To setup the project locally you need to clone this repo, from `main` branch or some latest `TAG`

```bash
# copy .env file from .env.example
$ cp .env.example .env
```

### Configuration

This project is a [Nest](https://github.com/nestjs/nest) framework TypeScript repository.

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Lint

```bash
# lint check
$ yarn lint

# lint fix
$ yarn lint:fix
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e # (WIP)

# test coverage
$ yarn test:cov
```

#### Build Docker Image

- `docker build -t foodbyte-api-service .`

#### Run Docker Image

- Run `docker run -d -p 3000:3000 foodbyte-api-service`
- You may access the running docker app on [`http://localhost:3000/api-docs`](http://localhost/api-docs)

#### Run Docker Image From Docker hub

- **[Docker Image Repository](https://hub.docker.com/repository/docker/naeemark/foodbyte-api-service)**
- Run `docker run -d --name foodbyte-api-service -p 3000:3000 naeemark/foodbyte-api-service`
- You may access the running docker app on [`http://localhost:3000/api-docs`](http://localhost/api-docs)

#### Stop Docker Container

- Run `docker kill {container-id}`

### Pre-reqs

- node v16+
- nestjs
- Docker
- Postgres:v14
- jest
- huskey
- VS Code

### Tools Included

- Swagger
- TypeORM
- Joi
- Github Actions
- EC2 Instance for deployment

#### Auth

- A JWT auth token should be used for basic authentication for all the endpoint except `health`

## External Tools:

- **[Github Actions](https://github.com/features/actions)**
- **[Docker](https://www.docker.com/)**

## Deployment

- When a `pull request` is merged in `main`, `Github Action` starts and following steps are done by automated CI/CD:
  - Creates Environment and Runs all tests
  - Makes a deployment to Github packages (Mock)
  - Creates the Docker Image and pushes to [Docker Repository](https://hub.docker.com/repository/registry-1.docker.io/naeemark/foodbyte-api-service)

**_- As a next step, it is deployed manually in an ec2 instance._**

## Contribution guidelines

- Forks are always appreciated
