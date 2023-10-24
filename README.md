# Engagement backend - NodeJS

This project is based on the management of data related to real-time student engagement measurement. It handles user login and real-time data registration that students send during a class session.

- [Installation](#installation)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [License](#license)

## Installation

1. Fork this project to your personal space.
2. Clone the repository from your personal space to your computer.
3. Create the dev.env file in the root of the project based on the .env.example file and fill in all the fields.
4. Install dependencies using the `npm install` command.
5. Start MongoDB with Docker using the command, or whenever you need to deploy the development environment, run `docker-compose up -d mongodb`.
6. Load initial data with the `npm run seed:random` command.
7. Check the development environment with the `npm run dev` command.
8. Test endpoints with Postman or Insomnia.

## Architecture
We base the project's architecture on CLEAN ARCHITECTURE.
![Image Clean Architecture](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*0R0r00uF1RyRFxkxo3HVDg.png)
```
└── Frameworks, Web: Frontend en Angular
  ├── Controllers: routes, middlewares
    ├─── Use Cases: services
      ├─── Entities: entities
 
```
- Entities: Enterprise Business Rules. Core entities of our business. Example: Poll, Question, User, etc.
- Use Cases: Application Business Rules. All logic related to the business.
- Controllers: Interface Adapters. They provide access.
- Web: Frameworks and Drivers.

This layered architecture follows this schema:

Controllers (Routes, Middlewares) <-> Services <-> Libs(Models)

### Workflow

#### Controllers: Contain routes and middlewares.
- Controllers access the services layer.

#### Services: Where the business logic is located.
- Services use libraries.

- Libraries are responsible for interacting with the entities layer.
- Libraries interact with other data sources: external API or database.

#### Middlewares
The middleware flow is as follows:
Request -> Middlewares -> Response

### Entities

- User: Collection of users.
- Poll: Collection of surveys.
- Question: Collection of survey questions.
- Record-Activity: Collection of activities that the user performs during the class.
- Room: Collection of rooms created for users.

## Configuration

The project already comes with a default configuration as follows:

```
.
├── README.md
├── dataset
├── docker-compose.yml
├── makefile
├── node_modules
├── package-lock.json
├── package.json
├── scripts
└── src
  ├── app.js
  ├── index.js
  ├── config
  ├── database
  ├── dtos
  ├── helpers
  ├── middlewares
  ├── routes
  ├── services
  └── socketio
```

### Scripts

- The `npm run start` command starts the Node server in production mode.
- The `npm run dev` command starts a server with live reload.
- The `npm run seed:random` command runs an initial load of random data.

## License

This project is released under the [MIT License](https://opensource.org/licenses/MIT).
