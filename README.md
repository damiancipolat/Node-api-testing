<img src="https://github.com/damiancipolat/node-bff/blob/master/doc/node.png?raw=true" width="150px" align="right" />

# Node-api-testing
This example was created to be used as a sandbox for qa engineers, who want to lean how to test
api rest using nodejs.

We are using this testing projects as an testing api **https://gorest.co.in/**.

## Stack
We use the follow stack to make api testing.

- Nodejs v16.0
- Supertest
- Jest
- dotenv

## Configuration
The projects uses a .env file to set environment variables, example:

```sh
API_HOST="https://gorest.co.in/public/v1"
API_TOKEN="xxxxxxxxx" 
```

## Install
Run the next command to install dependencies.

```sh
npm install
```

## Run test
The script will the run all the test case from al the test files.

```sh
npm test
```

The output look like this:

```sh
 PASS  ./delete.user.test.js (5.831 s)
  DELETE /users
    ✓ Borrar usuario (1737 ms)
    ✓ Borrar usuario (3481 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        5.89 s, estimated 7 s
Ran all test suites matching /delete.user.test.js/i.
```

# Test cases:
There are trhee test scenarios:

1) Test the **GET /user** endppint and run some query and analyze reponse.
2) Test the **POST /user** endpoint to create some mock responses and analyze responses.
3) Test the **DELETE /user** endpoint in this case we mix the creation (POST) and delete the resource and analyze response.
4) Test the **PUT/user** endpoint in this case we mix the creation (POST) and update the resource and analyze response.