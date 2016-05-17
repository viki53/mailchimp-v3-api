'use strict';

/**
 * Mailchimps API V3 integration
 */
if (!fetch) {
	var fetch = require('node-fetch');
}

/**
 * The Mailchimp v3 API integration for nodejs
 * Detailed information can be found in the readme.md file
 *
 * @author      Corentin Hatte
 * @version     0.1
 */
class MailChimpV3 {

   	/**
	 * Constructor function
	 *
	 * @param {string} 	i Object with key and optional host information
	 */
    constructor(i) {
    	/**
    	 * Report error when key is not set, otherwise set key to this.key
    	 */
    	if (!i.key) {
    		throw new Error('Mailchimp API key is undefined, add your API KEY');
    	}

		this.key = i.key;

	    /**
    	 * Check if custom server location is set, if not, set to 12
    	 */
    	this.location = i.location || 'us12';

	    /**
    	 * Check if debug is set, if not, set to false
    	 */
		this.debug = !!i.debug;
    }

	/**
	 * Connect()
	 * Makes an https connection to the Mailchimp server
	 *
	 * @param {string}	endpoint Based on http://goo.gl/hAZnhM
	 * @param {string}	method Method set for request type
	 * @return {Object}	returns the promises then() and error()
	 */
    connect(endpoint, method, data){

    	var decodedData = JSON.stringify(data);

    	/**
    	 * Set request options
    	 */
    	var options = {
    		headers: {
    			'Content-Type': 'application/json'
    		},
    		auth: 'anystring:' + this.key,
			port: 443,
			method: method
		};

		/**
		 * If data is set, add to POST
		 */
		if (data) {
			options['headers'] = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': decodedData.length
			};
	    } else {
	    	if (this.debug) {
	    		console.log('** No data is set (sometimes this is ok, for example with a GET request)');
	    	}
	    }

		/**
		 * Do the actual request, console.logs if debug === true
		 */

 		if (decodedData) {
 			options.body = decodedData;
 		}

		var debug = this.debug;

		return fetch(this.location + '.api.mailchimp.com/3.0' + endpoint, options)
		.then(function(res) {
			if (debug) {
				console.dir(res);
			}
			return res.json();
		});
    }

	/**
	 * Get()
	 * Used for all GET related calls
	 *
	 * @param {endpoint}	endpoint Based on http://goo.gl/hAZnhM
	 * @return {Object}		returns the promises then() and error()
	 */
    get(endpoint){
    	return this.connect(endpoint, 'GET');
    }

    post(endpoint, data){
    	return this.connect(endpoint, 'POST', data);
    }

    patch(endpoint, data){
    	return this.connect(endpoint, 'PATCH', data);
    }

    put(endpoint, data){
		return this.connect(endpoint, 'PUT', data);
    }

    delete(endpoint, data){
		return this.connect(endpoint, 'DELETE', data);
    }

}

/**
 * Return the module
 */
module.exports = MailChimpV3;
