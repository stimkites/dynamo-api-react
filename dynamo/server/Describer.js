/**
 * Here we describe how we insert/fetch data
 */

let Processor = require( './Processor' );
let Executor  = require( './Executor'  );

class Describer {
  
  constructor( app, db ){
    this.app = app;
    this.processor = new Processor( db );
    this.executor  = new Executor( db );

    this.init();
  }
  
  /**
   * Initialize
   */
  init(){
    
    let { app, processor, executor } = this;
    
    /*Tokens and auth*/
    app.put ( "/dynamo/tokens",  processor.tokens  );
    app.post( "/dynamo/auth",    processor.auth    );
  
    /*Users*/
    app.get    (  "/dynamo/users", processor.users().get   );
    app.put    (  "/dynamo/users", processor.users().put   );
    app.delete (  "/dynamo/users", processor.users().del   );

    /*Clients*/
    app.get    (  "/dynamo/clients", processor.clients().get   );
    app.put    (  "/dynamo/clients", processor.clients().put   );
    app.delete (  "/dynamo/clients", processor.clients().del   );

    /*Operations*/
    app.get    (  "/dynamo/operations", processor.operations().get   );
    app.put    (  "/dynamo/operations", processor.operations().put   );
    app.delete (  "/dynamo/operations", processor.operations().del   );

    /*Trigger*/
    app.get   (   "/execute/trigger", executor.trigger );


    /*
    (req, res) => {
        db.get().then( data => res.json( data ) ).catch( error => res.json({error:error}) );
    });
  
    /*Clients*/
  
    /*Sync*/
  /*
    app.get("/dynamo", (req, res) => {
      db.get().then( data => res.json( data ) ).catch( error => res.json({error:error}) );
    });
  
    app.post("/dynamo", (req, res) => {
      db.put( 'Cars', req.body ).then(
        () => {
          db.get().then( data => res.json( data ) ).catch( error => res.json({error:error}) );
        }
      ).catch( error => res.json({error:error}) );
    });
  
    app.put("/dynamo", (req, res) => {
      db.put( 'Cars', req.body ).then(
        () => {
          db.get().then( data => res.json( data ) ).catch( error => res.json({error:error}) );
        }
      ).catch( error => res.json({error:error}) );
    });
  
    app.delete("/dynamo", (req, res) => {
      db.rem( 'Cars', req.body ).then(
        () => {
          db.get().then( data => res.json( data ) ).catch( error => res.json({error:error}) );
        }
      ).catch( error => res.json({error:error}) );
    });
  
    /* -------------------------------------------------------------------------- */
  }
  
}

module.exports = Describer;