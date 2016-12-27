# Interdict
Middleware is good, right? What's not good is when a module doesn't support it. This module adds that in for you!

# How to use
Firstly install it by running
```bash
npm install interdict --save
```

Then you can use interdict like this:
```javascript
const Interdict = require('interdict');
const interdict = new Interdict();

//Example function with a callback:
function myFunction(callback) {
  //Notice how we pass two arguments into the middleware system
  callback('foo', 'bar');
}

//Register middleware with interdict. All middleware functions must have two arguments:
//One for the array of function arguments, and the other for the next middleware function
interdict.add(function(array, next) {
  //Do some stuff with array, which is the arguments in order
  //You should always push to the array, rather than set specific indices
  array.push('mars');
  //Once you're done, call the next() function.
  next();
});

//Another example function
interdict.add(function(array, next) {
  array.push(42);
  next();
});


myFunction(interdict.run(
  function(myArg1, myArg2, myArg3, myArg4) {
    //If we log all of these, then they should be in the order added, which is:
    //foo, bar, mars, 42
    console.log(myArg1, myArg2, myArg3, myArg4);
  }
));

```

See more examples in the examples directory.
