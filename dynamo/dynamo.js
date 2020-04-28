let DB = require('./model');
let uuid = require('node-uuid');

/**
 * Dynamo DB routine
 *
 * @by Stim, 02.02.2020
 */
class Dynamo {

    constructor( params, config ){

        this.params = params || DB;

        let AWS = require("aws-sdk/index");

        AWS.config.update( config || {
          region: "eu-west-1",
          accessKeyId: 'xxxx',
          secretAccessKey: 'xxxx',
          endpoint: "http://localhost:8000"
        });

        this.db = new AWS.DynamoDB();
        this.client = new AWS.DynamoDB.DocumentClient();

        this.checkCreate = this.checkCreate.bind( this );

        this.put = this.put.bind(this);
        this.get = this.get.bind(this);
        this.rem = this.rem.bind(this);
        
        this.checkCreate();
    }

    checkCreate(){
        let { db, params, client } = this, table, res = [];
        for( let i = 0; i < params.length && ( table=params[i] ); i++ )
          res.push( db.createTable( table ).promise() );
        Promise.all( res ).then().catch(
          error => {
            if( error && error.code !== "ResourceInUseException" ) throw Dynamo.log( error );
          }
        ).then( () => client.put( {
          TableName: 'Users', Item: { id: '00001', email: 'admin@admin.ad', pass: '123321' }
        } ).promise().then( () => Dynamo.log( 'Added admin account successfully!' ) ).catch( e => Dynamo.log( e ) ) );
    }

    static log( data ){
      console.error( '[DYNAMO] ' + JSON.stringify( data, null, 2 ) );
      return data;
    }
    
    static prepare_scan_filter_params( params ){
      let _params = {}, filled = false;
      for( let k in params )
        if( params.hasOwnProperty( k ) && params[ k ] )
          filled = ( _params[ k ] = {
            AttributeValueList: [ params[ k ] ],
            ComparisonOperator: "EQ"
          } );
      return filled ? _params : null;
    }

    static checkUUID( data ){
      if( ! data.id )
        data.id = uuid.v4();
      return data;
    }

    async put( table, data ) {
      data = Dynamo.log( Dynamo.checkUUID( data ) );
      return new Promise( ( res, rej ) => {
        this.client.put({
            TableName: table,
            Item: Dynamo.checkUUID(data)
          },
          error => {
            if ( error ) {
              Dynamo.log(error);
              rej( error )
            }
          })
          .promise()
          .then( () => { res( data ) } )
          .catch( e => { rej( e ) } )
      } );
    }

    async get( table, params ){
        let filter = Dynamo.prepare_scan_filter_params( params );
        if( params && ! filter ) return new Promise( null );
        let scan_data = {
          TableName: table,
          Select: "ALL_ATTRIBUTES"
        };
        if( filter ){
          scan_data.ScanFilter = filter;
        }
        return this.client.scan( scan_data, ( error ) => { if ( error ) Dynamo.log( error ); } ).promise();
    }

    async rem( table, params ){
      return this.client.delete( {
            TableName: table,
            Key: params
        },
        error => {
          if ( error ) Dynamo.log( error );
        }
      ).promise();
    }

}

module.exports = Dynamo;