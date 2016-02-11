web-client-side
===============

This project is made by :  
* [Grégoire Sébastien](https://github.com/sgregoire)  
* [Lozach Maxime](https://github.com/MaximeL)  
* [Moulaye Bezeid](https://github.com/yezideteachers)  
* [Palmero Romain](https://github.com/asromain)  

Client
------

### Setup

You must have :  
* *NodeJs* and *npm*  
* *Bower*
* *Grunt*

Run the following command to install all the dependencies :  
`cd client`   
`npm install && bower install`  

### Run

Run the following command to launch the client with *Grunt* :  
`cd client`  
`grunt serve`  

Server
------

You must have :  
* *NodeJs* and *npm*  
* *MongoDB*  

Run the following command to install all the dependencies :  
`cd server`  
`npm install`  

### Run

Run the following command to launch the server with *NodeJs*:   
Set environment variable : `NODE_ENV=development`  
`$ mongod`  
`$ cd server`  
`npm start`  

### Tests

Running the tests with mocha.  
Set environment variable : `NODE_ENV=test` and `PORT=3001`  
`npm start`  
Then, to execute the set of 51 tests, just run :  
`mocha test`  

