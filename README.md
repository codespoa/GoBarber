# Go Barber

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/codespoa/GoBarber)

### Tech

* [node.js]
* [typescript]
* [postreSQL]
* [jest]
* [Express]

### Installation

You need to have postgreSQL installed or running in a docker container
You need to create one database with name gobarber in postgreSQL

Install all dependencies

```sh
$ git clone https://github.com/codespoa/GoBarber.git
$ cd GoBarber
$ yarn || npm install
```

after create the database and install all dependecies you need runing the migrations

```sh
$ yarn typeorm migration:run || npm run typeorm migration:run
```

and now execute

```sh
$ yarn dev:server || npm run dev:server
```