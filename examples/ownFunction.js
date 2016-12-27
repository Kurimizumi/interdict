const Interdict = require('../index');
const interdict = new Interdict();

//Example function with a callback:
function myFunction(callback) {
  //Notice how we pass two arguments into the middleware system
  callback('foo', 'bar');
}

//Register middleware with interdict. All middleware functions must have two arguments:
//One for the array of function arguments, and the other for the next middleware function
interdict.use(function(args, next) {
  //Do some stuff with array, which is the arguments in order
  //You should always push to the array, rather than set specific indices
  args.push('mars');
  //Once you're done, call the next() function.
  next();
});

//Another example function
interdict.use(function(args, next) {
  args.push(42);
  next();
});


myFunction(interdict.run(
  function(myArg1, myArg2, myArg3, myArg4) {
    //If we log all of these, then they should be in the order added, which is:
    //foo, bar, mars, 42
    console.log(myArg1, myArg2, myArg3, myArg4);
  }
));
