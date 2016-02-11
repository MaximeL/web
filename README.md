Web
===============

This project is made by :  
* [Grégoire Sébastien](https://github.com/sgregoire)- Backend, Testing and Pedal customisation
* [Lozach Maxime](https://github.com/MaximeL) - WebAudio integration, effects
* [Moulaye Bezeid](https://github.com/yezideteachers) - Communications
* [Palmero Romain](https://github.com/asromain) - backend, testing, UI

Prerequisites
------
This project is running on a MEAN stack.

You will need 
* [MongoDB](https://www.mongodb.org/) running on port 27017 
* [NodeJS and npm](https://nodejs.org/en/)
* [Grunt](http://gruntjs.com/) (with -g flag)
* [Bower](http://bower.io/) (with -g flag)


Server-side
------

The server side require :
* *NodeJs* and *npm*
* *MongoDB*

### Informations
The server will provide a REST web-service for the client and provide some resources.

#### Rest Webservice
* User Management
  * Creation
  * Update
  * Authentication
* Pedal Management
  * Creation
  * Update
  * Delete
* Comment Management
  * Add a comment
  * Get all comments of a pedal
* Rating Management
  * Add a note
  * Get a pedal rates
* Sharing Management
  * Update shared users of a pedal
  
#### Ressources
The resources are musics for testing pedals if you don't have a guitar near by.


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
* [JSplumb](https://jsplumbtoolkit.com/)


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

### Main Page

At first arrival, you will be ask to connect. If you don't have an account, you'll be invited to sign-up to the website. The other pages are not accessible without being authenticated.  
On the home page, you'll find the list of your pedals. The pedals you created are on the left and the pedals shared with you are on the right.  

You can do the following with your pedals :  
* edit 
* play with 
* comment 
* rate
* share
* delete

You can do the following with shared pedals :  
* play with 
* comment 
* rate

### Effects

The page to edit your pedal let you manage different low level effects and let you manipulate the connections between them
in order to create a higher level pedal. Each action on the page trigger a save to the server in order to save the state of the page and recover your work at any time later.

The website provide the following effects :  
* Overdrive
* Convolver
* Tremolo
* Gain
* Delay
* Highshelf & Lowshelf
* Highpass & Lowpass
* Peaking
* Notch

After the effects are set, you can design the pedal by choosing it appearance and the level you want to modify. The levels you don't provide on the pedal will keep the value setted in the low level editor.  
You can play with the designed pedal from the main menu.
