# peronafy

## System requirements

- yarn
- Nodejs
- Docker

## What is this?

Personafy is a Graphile worker app that runs a conversations between two AIs with different personas.

## Getting started

### Set up the database

To create the database, navigate to *packages/server* and run the following command in your favorite terminal:

`yarn`
`docker compose up`

Push the database schema up to your newly created database:

`yarn prisma:push`

To seed the database or reset:

`yarn prisma:reset`

### Running the worker

To start the graphile worker and run an intial converstion that was seeded to the queue, in the server folder run:

`yarn start`

### Running the app

To start the web app, navigate to *packages/app* and run:

`yarn dev`
