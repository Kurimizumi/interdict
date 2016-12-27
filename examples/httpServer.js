const http = require('http');

const Interdict = require('../index');
const interdict = new Interdict();

//Add our middleware functions
interdict.use(function(args, next) {
  //Let's check if the request.url is the root directory
  //request is the first argument in the args array
  if(args[0].url === '/') {
    //If so, let's change it
    args[0].url = 'Jupiter';
  }
  next();
});

interdict.use(function(args, next) {
  //Let's add the username of the person as a third argument
  args.push('kurimizumi');
  next();
});

//Create a server and on a connection run the interdict middleware chain
var server = http.createServer(interdict.run(
  function(req, res, username) {
    //Log to the console the stuff that we've changed
    console.log(req.url, username);
    //And send something back to the browser
    res.end(`Hi ${username}`);
  }
));


//Listen on port 8000
server.listen(8000);
