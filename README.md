Dippi Technical Challenge

Node Express service, using Prisma with ORM, Postgresql as database and Yarn Workspaces to handle a mono-repo architecture.

Usage
Requirements
NodeJs 14.X.X
NPM 8.1.4

Prepare enviroment

Install Node and NPM if not installed
Clone this repo
git clone https://github.com/JavierAmaya/dippi-technical-challenge.git

Go to project
cd dippi-technical-challenge

Please make sure you have an .env file with the following configuration in the path /dippi-technical-challenge/db-service
if not you can create it:

DATABASE_URL="postgresql://localUser:localPass@db/dbDippi?schema=public"

Create docker build 
docker-compose build 

Run project 
docker-compose up -d

Defined endpoints
These are examples:

1. Endpoint adding a new person in the database

Method: GET
Request: http://localhost:3000/person/addPerson?name=Victor Javier Amaya Matute&age=24
Validations in the request:

Parameter: Name 
Max length: 50
Variable that only accepts letters, and a maximum of 50 characters, there is no defined recommended number for the total number of characters, but given statistics from other systems, 50 is taken as an average.

Parameter: Age
Max length: 3
Valid only receive integers, does not allow floating numbers, or negative.

Response:
{
    "id": 1,
    "name": "Victor Javier Amaya Matute",
    "age": 24
}


2. Endpoint helloWorld
This endpoint calls a function Hello(name: string) that lives in another hello-hello workspace, retrieves the last record in the PostgreSQL database, extracts its name field, and uses it as an argument to the Hello function. In case the database is empty, it returns a controlled error message.

Method: GET
Request: http://localhost:3000/person/helloWorld
Parameters: None

Response:

If  records exist:

{
    "msg": "Hello Victor!"
}

else

{
    "msg": "No person found"
}


3. Endpoint Get Persons
Endpoint that returns all the records created in the database

Method: GET
Request: http://localhost:3000/person
Response:
[
    {
        "id": 1,
        "name": "123",
        "age": 20
    },
    {
        "id": 2,
        "name": "Victor",
        "age": 22
    }
]