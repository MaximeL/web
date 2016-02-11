Web
===============

This project is made by :  
* [Grégoire Sébastien](https://github.com/sgregoire)  
* [Lozach Maxime](https://github.com/MaximeL)  
* [Moulaye Bezeid](https://github.com/yezideteachers)  
* [Palmero Romain](https://github.com/asromain)  

Prerequisites
------
This project is running on a MEAN stack.

You will need 
* [MongoDB running on port 27017](https://www.mongodb.org/) 
* [NodeJS and npm](https://nodejs.org/en/)
* [Grunt (with -g flag)](http://gruntjs.com/)
* [Bower (with -g flag)](http://bower.io/)


Server-side
------

The server side require :
* *NodeJs* and *npm*
* *MongoDB*


### Setup
You need to install all dependencies :
```
$ cd server 
$ npm install
```
And you also need to run Mongo's deamon:
```
$ {mongo_bin}/mongod
```

### Run

Run the following commands to launch the server with *NodeJs*:  
```
$ cd server
$ export NODE_ENV=development
$ npm start
```  
The server will start on port 3000.

### Tests

Run the following commands to launch the server with *NodeJS* on test environment:
```
$ cd server
$ export NODE_ENV=test
$ export PORT=3001
$ npm start
```

Then, to execute the set of 51 tests, just run :
```
$ mocha test
```

Client-side
------

The client side require :
* *NodeJs* and *npm*
* *Bower* for retrieve front-end dependencies
* *Grunt* for create a minimal web-server (with [Express](http://expressjs.com/))

And is based on:
* [AngularJS](https://angularjs.org/)
* [Twitter Bootstrap](http://getbootstrap.com/)


### Setup

Run the following command to install all the dependencies :
```
$ cd client
$ npm install
$ bower install
```

### Run

Run the following command to launch the client with *Grunt* on *Express for NodeJS* :
```
$ cd client  
$ grunt serve
```

Grunt will start a new page with your favorite browser to [http://localhost:3000](http://localhost:3000).

We recommend using [Google Chrome](https://www.google.fr/chrome/browser/desktop/).
