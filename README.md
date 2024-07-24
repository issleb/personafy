# peronafy

## System requirements

- yarn
- Nodejs
- Docker

## What is this?

Personafy is a Graphile worker app that runs a conversations between two AIs with different personas.

## Set up the database

To create the database, run the following command in the project folder your favorite terminal:

`docker compose up`

Push the database schema up to your newly created database:

`yarn prisma:push`

To seed the database or reset:

`yarn prisma:reset`

## Running the worker

This will start the graphile worker and run an intial converstion that was seeded to the queue:

`yarn start`
