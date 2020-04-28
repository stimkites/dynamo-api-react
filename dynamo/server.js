/**
 * This is the server app for listening on our localhost port 3022
 *
 * We are accepting requests only from our own server and process incoming data as is
 */

let Describer = require( './server/Describer' );
let _db       = require('./dynamo');
let express   = require('express');
let cors      = require('cors');

/**
 * Allow domains here to access the API
 */
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3022',
];

/**
 * Initialize our local server
 */
class Server {
  
  constructor( port ){
    try{
      this.app       = express();
      this.db        = new _db();
      this.corsOptions = {
        origin : function(origin, callback){
          if (whitelist.indexOf(origin) !== -1) {
            callback( null, true )
          } else {
            callback( new Error('Not allowed by CORS!') )
          }
        },
        credentials: true
      };
    }catch( e ){
      console.error( e );
    }finally {
      this.initApp( port );
    }
  }
  
  initApp(){
    let { app, corsOptions, db } = this;
    app.use( express.json() );
    app.use( cors( corsOptions) );
    new Describer( app, db );
    if ( ! module.parent ) {
      const port = process.env.PORT || arguments[0] || 3022;
    
      app.listen(port, () => {
        console.error( "Express server listening on port " + port + "." );
      });
    }
  }
  
}

new Server();