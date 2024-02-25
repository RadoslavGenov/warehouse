## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerequisites

```sh
cp .env.dist .env
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database generate and migrate CLI command

To create new migration run:

```sh
npm run generate-migration <NAME>
```

result in the src/database/migration/\*.ts

To run migrations:

```sh
npm run migrate
```

## App structure is as follows

Decided to go with a modular approach, for better separation of concerns.

```
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── cli
│   │   └── generate.js
│   ├── database
│   │   ├── dataSource.ts
│   │   ├── database.modules.ts
│   │   └── migrations
│   │       ├── <TIMESTAMP>-<MIGRATION_NAME>.ts
│   ├── main.ts
│   ├── modules
│   │   ├── customer
│   │   │   ├── customer.module.ts
│   │   │   └── entities
│   │   │       └── customer.entity.ts
│   │   ├── history
│   │   │   ├── entities
│   │   │   │   ├── history.entity.ts
│   │   │   │   └── record-type.enum.ts
│   │   │   ├── history.module.ts
│   │   │   ├── history.resolver.ts
│   │   │   └── history.service.ts
│   │   ├── product
│   │   │   ├── dto
│   │   │   │   └── create-product.input.ts
│   │   │   ├── entities
│   │   │   │   ├── import.entity.ts
│   │   │   │   └── product.entity.ts
│   │   │   ├── product.module.ts
│   │   │   ├── product.resolver.ts
│   │   │   ├── product.service.spec.ts
│   │   │   └── product.service.ts
│   │   └── warehouse
│   │       ├── dto
│   │       │   └── create-warehouse.input.ts
│   │       ├── entities
│   │       │   └── warehouse.entity.ts
│   │       ├── warehouse.module.ts
│   │       ├── warehouse.resolver.ts
│   │       ├── warehouse.service.spec.ts
│   │       └── warehouse.service.ts
│   └── schema.gql
├── test
|   ├── types.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```
