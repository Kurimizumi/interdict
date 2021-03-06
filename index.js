'use strict';

module.exports = class {
  constructor() {
    this.middleware = [];
  }

  //Add middleware
  use(middleware) {
    //Throw an error if the user is not trying to add a function
    if(typeof middleware !== 'function') {
      throw new Error('Not a function');
    }
    this.middleware.push(middleware);
    //Return this class, so that .use can be chained
    return this;
  }

  //For when the middleware chain should be run
  run(callback) {
    //Return initial function to be run
    return function() {
      //Convert arguments that we receive to an array
      const array = Array.from(arguments);
      //Define the function to run the next middleware
      const runNext = (i) => {
        //Check if our i value is greater than or equal to our middleware length
        if(i >= this.middleware.length) {
          callback.apply(callback, array);
          return;
        }
        this.middleware[i](array, () => {
          runNext(i+1);
        });
      }
      runNext(0);
    }.bind(this);
  }
}
