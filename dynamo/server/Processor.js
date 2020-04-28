/**
 * Here we do all the DB routine
 */

class Processor {

    constructor( db ){
        this.db = db;
        this.tokens     = this.tokens.bind( this );
        this.auth       = this.auth.bind( this );
        this.clients    = this.clients.bind( this );
        this.users      = this.users.bind( this );
        this.operations = this.operations.bind( this );
    }

    /**
     * Create an Auth token
     *
     * @returns {Promise<T>}
     * @private
     */
    __createToken(){
        let { db } = this;
        return db.put( 'Tokens', {
            authenticated: false,
            expires: Date.now() + 3600000
        } )
    }

    /**
     * Process tokens
     *
     * @param req
     * @param res
     */
    tokens( req, res ){

        let { db } = this;

        let params = req.body;
        if( params.id && params.id.length )
            db.get( 'Tokens', req.body )
                .then( data => {
                    if( data.Items[0].id && data.Items[0].expires > Date.now() )
                        res.json( data.Items[0] );
                    else
                        this.__createToken()
                            .then( data => res.json( data ) )
                            .catch( error => res.json( { error:error } ) );
                } )
                .catch( error => res.json( { error:error } ) );
        else
            this.__createToken()
                .then( data => res.json( data ) )
                .catch( error => res.json( { error:error } ) );
    }

    /**
     * Authenticate
     *
     * @param req
     * @param res
     */
    auth( req, res ){
        let { db } = this;
        let { credentials, id } = req.body;
        db.get( 'Users', credentials )
            .then(
                data => db.put( 'Tokens', {
                    id: id,
                    authenticated: data.Items[0].email || false,
                    expires: Date.now() + 3600000
                } )
                    .then( data => res.json( data ) )
                    .catch( error => res.json( { error:error } ) )
            )
            .catch( error => res.json( { error:error } ) );
    }

    /**
     * Clients routine
     * 
     * @returns {{get: get, put: put, del: del}}
     */
    clients(){
        let{ db } = this;
        return {
            get : ( req, res ) => {
                db.get( 'Clients' ).then( data => res.json( data ) ).catch( error => res.json({ error:error }) );
            },

            put : ( req, res ) => {
                db.put( 'Clients', req.body ).then( data => res.json( data ) ).catch( error => res.json({error:error}) );
            },

            del : ( req, res ) => {
                db.rem( 'Clients', req.body ).then( data => res.json( data ) ).catch( error => res.json({error:error}) );
            }
        }
    }

    /**
     * Users routine
     *
     * @returns {{get: get, put: put, del: del}}
     */
    users(){
        let{ db } = this;
        return {
            get : ( req, res ) => {
                db.get( 'Users' ).then( data => res.json( data ) ).catch( error => res.json({ error:error }) );
            },

            put : ( req, res ) => {
                db.put( 'Users', req.body ).then( data => res.json( data ) ).catch( error => res.json({error:error}) );
            },

            del : ( req, res ) => {
                db.rem( 'Users', req.body ).then( data => res.json( data ) ).catch( error => res.json({error:error}) );
            }
        }
    }

    /**
     * Operations routine
     *
     * @returns {{get: get, put: put, del: del}}
     */
    operations(){
        let{ db } = this;
        return {
            get : ( req, res ) => {
                db.get( 'Operations' ).then( data => res.json( data ) ).catch( error => res.json({ error:error }) );
            },

            put : ( req, res ) => {
                db.put( 'Operations', req.body ).then( data => res.json( data ) ).catch( error => res.json({error:error}) );
            },

            del : ( req, res ) => {
                db.rem( 'Operations', req.body ).then( data => res.json( data ) ).catch( error => res.json({error:error}) );
            }
        }
    }

}

module.exports = Processor;