import React from 'react';
import Form from "../Form";

/**
 * Client object description
 *
 * Here we describe in defaults how client record in DB looks like and provide form for editing
 *
 * 3 steps:
 *  1. Connect to Woo. Woo URL, Woo CS, Woo CK -> connect -> add hooks -> check
 *  2. Connect to Sitoo. Api credentials -> connect -> check
 *  3. Autosync settings, triggers and full-sync operations
 */

class Client extends React.Component {

    constructor(props) {
      super(props);

        /**
         * Model of Client object
         */
      this.defaults = {
        id: 0,
        name: '',
        __settings: {
            woo: {
                url : '', // URL to woocommerce API
                cs  : '', // consumer secret
                ck  : ''  // consumer key
            },
            sitoo: {
                api_id  :
                    '90325-100',                                    // API ID
                api_pass:
                    'gj3RV3VVI2UX7AZfDY0oB24qrI1HTe3k0yM2mezV',     // API Password
                base_url:
                    'https://api-sandbox.mysitoo.com/v2/accounts/', // Base URL
                site_id : '',                                       // Sitoo API Endpoint
                mode    : 'test',                                   // Mode

                wh_id   : '',       // WooCommerce Warehouse
                wh_type : '',       // WooCommerce Warehouse Type (set automatically upon selecting wh_id)
                wh_data : {},       // WooCommerce Warehouse data fetched from Sitoo on first connection

                ex_ext  : true,     //Exclude external

                autosync: {         // Autosync options
                    enabled: true,  // Autosync Cron
                    match: false,   // Match down all products, categories and coupons
                    stock: true,    //
                    orders: 2       // 0 - Disabled, 1 - all, 2 - only Store2Door (custom status)
                },

                trigger_stock       : false,
                trigger_fifo_stock  : false,

                fifo_mode: 'manual',                // manual | stocktaking

                trigger_products    : false,

                trigger_cac         : true,         // Click And Collect custom status orders

                trigger_vouchers        : false,    // Sync on coupons
                trigger_add_shipping    : true,     // Send order shipping as order rows to Sitoo
                trigger_stateid_stock   : 0,        // Order status in Sitoo for stock changes orders sync
                trigger_stateid_cac     : 10,

                trigger_no_ga    : false,           // Prevent sending any fetched Sitoo orders to Google Analytics
                order_status     : 'wc-processing',
                order_cac_status : 'wc-completed',
                order_s2d_status : 'wc-processing',

                full_sync       : { match_products: true, products_down: true },

                logs            : true,
                ignore_sku      : false,
                check_x_limit   : true

            },
            sync: {
                // Sync options

            }
        },
        active: false,
        added: 0,
        modified: 0
      };

      this.state = this.defaults;
      this.processForm = this.processForm.bind(this);
      this.resetForm = this.resetForm.bind(this);
      this.controls = this.controls.bind(this);
      this.setValue = this.setValue.bind(this);
    }

    controls(){
        let { state } = this;

    }

    /**
     * Columns for listing
     *
     * @returns {{id: string, name: string, active: string, added: string, modified: string}}
     */
    static listing(){
        return {
            id      : 'ID',
            name    : 'Label',
            active  : 'Is active',
            added   : 'Date added',
            modified: 'Date modified'
        }
    }

    setValue( o ){
      let newState = {}, { editing } = this.props;
      newState[ o.target.id ] = o.target.value;
      this.setState( newState );
      if( editing )
        editing[o.target.id] = o.target.value;
    }

    processForm( e ){
      let { editing } = this.props;
      this.props.process( editing || this.state );
      this.setState(this.defaults);
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    resetForm( e ){
      let { reset } = this.props;
      reset();
      this.setState(this.defaults);
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    render() {
      let { editing } = this.props;
      let { id, type, name, manufacturer, fuel, description } = editing || this.state;
      return (
          <div className={"edit-form-wrap"} id={"edit-client-form"}>
            <Form controls={this.controls} title={"Add/Edit client"} process={this.processForm} id={"client-form"}/>
          </div>
      )
    }
}

export default Client