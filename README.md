# Todo Express Api

This is a REST api that does th CRUD operations for the Todo application.


## Installation
To install the Todo app in your local follow these steps:

1. Install NodeJS if its not already installed. You can install it by the `brew install node` command in your terminal (it can be on your root directory)

```
~ $ brew install node
```

2. Install NVM if its not already installed. You can install it by the `brew install nvm` command in your terminal (it can be on your root directory)

```
~ $ brew install nvm
```

3. Now that you have nvm installed, we need install nvm version then node version in the .nvmrc with the `nvm install` command

```
~ $ nvm install
```

4. Clone the seo-admin-ui repo from `https://github.com/gopinathboyanapally/todo-express.git`

5. On your terminal, cd to the repo.

6. Now use the `nvm use` command to use a specific version of NodeJS required by seo-admin-ui

```
    $ nvm use
```

>should output this

```
Found '[...your-repos-path]/[app-directory]/.nvmrc' with version <20.14.0>
Now using node v20.14.0(npm v10.7.0)
```
7. Install all the dependencies

```
~ $ npm install
```

## Running the app on localhost
1. Run `npm run start:dev` on your terminal to run the dev environment.

2. You can now see it running on `http://localhost:8080/`

## Set up the Database

1. Download MySQL from `https://dev.mysql.com/downloads/mysql/`

2. Follow the instructions on the screen. Set the user and password.

3. Create a database
```
CREATE DATABASE databasename;

```

4. Navigate to database.js file in the repository and change the `user` and `password` fields which you provided in the MySQL server.

## Testing
1. Now once everything is setup, You can use the browser or Postman to test the apis.

2. You can get all the tasks using 
```
    GET http://localhost:8080/tasks
```
3. Create a new task
```
    POST http://localhost:8080/tasks
    {
        "title": "test",
        "color": "red"
    }
```

4. Update the task
```
    PUT http://localhost:8080/tasks/{id}
    {
        "title": "test",
        "color": "red",
        "completed": 1
    }
```

5. Delete the task
```
    DELETE http://localhost:8080/tasks/{id}
```