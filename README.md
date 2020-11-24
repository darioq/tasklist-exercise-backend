# Tasklist Exercise Backend
Tasklist exercise backend for TrueNorth.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [REST API](#rest-api)
* [Status](#status)
* [Contact](#contact)

## General info
This is the API for the tasklist exercise for TrueNorth.
* Normal mode: uses hipsum API to generate the tasks
* Enhanced mode (Database mode): uses mongo db cloud atlas database (https://www.mongodb.com/cloud/atlas)

## Technologies
* Node v13.9.0 - Express
* npm v6.13.7
* cross-env v7.0.2

They must be installed to run the API.

## Setup
Clone the project! - main branch
* git clone https://github.com/darioq/tasklist-exercise-backend.git

Go to the project directory
* cd tasklist-exercise-backend (default)

The APP needs the following environment variables to be initialized, to work properly

* TASKLIST_BACKEND_PORT=3000 (Port to run the server)
* TASKLIST_DATABASE_URL=user:password@xxxx.xxxx.mongodb.net (URL to connect to the database, required only when using database mode)
* TASKLIST_DATABASE_NAME=tasklist (Database name to connect, required only when using database mode)
* TASKLIST_DATABASE_PARAMETERS=?retryWrites=true (Database connection options, required only when using database mode)

It is possible to create a .env file (in the root directory) with the required environment variables or set the variables directly in the OS.

Install - To run this project, install it locally using npm

* cross-env must be installed globally: npm install -g cross-env
* npm install

Run

* Run on normal mode (without database): npm start
* Run on enhanced mode (with database): npm run startUsingDatabase

## REST API

## Get list of Tasks (Default N=3)

### Request

`GET /tasks/numberOfTasks`

curl --location --request GET 'localhost:3000/tasks'

### Response
```json
{
    "result": [
        {
            "isDone": false,
            "_id": "5fbd8318b3bdf444f09f2593",
            "title": "Already done task"
        },
        {
            "isDone": false,
            "_id": "5fbd831ab3bdf444f09f2595",
            "title": "Pending task 2"
        },
        {
            "isDone": false,
            "_id": "5fbd831cb3bdf444f09f2596",
            "title": "Salvia swag kombucha mixtape squid, unicorn schlitz craft beer lumbersexual tattooed etsy dreamcatcher"
        }
    ]
}
```

### Request

`GET /tasks/numberOfTasks`

curl --location --request GET 'localhost:3000/tasks'

### Response
```json
{
    "result": [
        {
            "isDone": false,
            "_id": "5fbd8318b3bdf444f09f2593",
            "title": "Already done task"
        },
        {
            "isDone": false,
            "_id": "5fbd831ab3bdf444f09f2595",
            "title": "Pending task 2"
        },
        {
            "isDone": false,
            "_id": "5fbd831cb3bdf444f09f2596",
            "title": "Salvia swag kombucha mixtape squid, unicorn schlitz craft beer lumbersexual tattooed etsy dreamcatcher"
        },
        {
            "isDone": false,
            "_id": "5fbd8321b3bdf444f09f2597",
            "title": "5fb6f614be15ba4b0c6f1f50"
        },
        {
            "isDone": false,
            "_id": "5fbd8322b3bdf444f09f2598",
            "title": "5fb6f614be15ba4b0c6f1f50"
        },
        {
            "isDone": false,
            "_id": "5fbd8323b3bdf444f09f2599",
            "title": "5fb6f614be15ba4b0c6f1f50"
        },
        {
            "isDone": false,
            "_id": "5fbd852b3235b1342446e01b",
            "title": "new task title"
        }
    ]
}
```

## Mark task as done

### Request

`PUT /tasks`

curl --location --request PUT 'localhost:3000/tasks' \ 	--header 'Content-Type: application/json' \ --data-raw '{"_id": "5fbd8319b3bdf444f09f2594"}'
	
### Response
```json
{
    "result": true
}
```
	
## Create a new task (Database mode only)

### Request

`POST /tasks` 

curl --location --request POST 'localhost:3000/tasks' \	--header 'Content-Type: application/json' \	--data-raw '{"title": "new task title"}'


### Response
```json
{
    "result": {
        "isDone": false,
        "_id": "5fbd852b3235b1342446e01b",
        "title": "new task title",
        "__v": 0
    }
}
```

## Features

Normal mode
* Generate N tasks
* Mark task as done

Enhanced mode

* Get N tasks 
* Mark task as done
* Create task
* Initialize example tasks

## Status
Project is: _finished_

## Contact
Created by Dario Quiroga - (dario.quiroga11@gmail.com) - feel free to contact me!