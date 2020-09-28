## Introduction

A sample REST API for serving mockup gamer information for my_personal development of QA tests.

## Running the application.

In order to run the application first execute

```
npm install
```

then compile the typescript into javascript by

```
npm run build
```

and finally start the server

```
npm run start
```

Server will be run at http://localhost:3000.

## Running requests.

Where id={1,2,3,4}, try calling:

```
http://localhost:3000/gamer/:id
```
```
http://localhost:3000/gamer/:id/results
```
```
http://localhost:3000/gamer/:id/photo
```
```
http://localhost:3000/gamers
```
```
http://localhost:3000/games
```
```
http://localhost:3000/games/:id/gamers
```