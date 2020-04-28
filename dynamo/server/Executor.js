/**
 * Here we process the client's operations
 */

class Executor {

    constructor( db ){
        this.db = db;
        this.trigger    = this.trigger.bind( this );
    }

    /**
     * Process queue
     *
     * @param req
     * @param res
     */
    trigger( req, res ){

        let { db } = this;

        db  .get( 'Operations', req.body )
            .then( data => {
                 // process operation
            } )
            .catch( error => res.json( { error:error } ) );
    }

}

module.exports = Executor;