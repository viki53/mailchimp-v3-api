# mailchimp v3 API
[![NPM](https://img.shields.io/npm/v/mailchimp-v3-api.svg)](https://www.npmjs.com/package/mailchimp-v3-api)

Just another Node module for Mailchimp API v3

As simple as possible for simple Mailchimp V3 API calls.

For more information see: http://developer.mailchimp.com/documentation/mailchimp/

## Installation:
`npm install mailchimp-v3-api-fetch --save`

## Usage:
_note: You need a nodejs or iojs version that supports ES6_

- First include the Mailchimp-v3 script and add the key.

```js
var mailchimp_api = require('mailchimp-v3-api-fetch');
var mailchimp = new mailchimp_api({
    key: '[KEY]',    // required, API key http://kb.mailchimp.com/accounts/management/about-api-keys
    debug: false,    // optional
    location: 'us12' // optional, one of Mailchimp locations: http://developer.mailchimp.com/status/
});
```

- Next you can call all API references mentioned here: http://developer.mailchimp.com/documentation/mailchimp/reference/overview/

- You can include the method as function and the endpoint as first parameter and call a then() promise on the result

### .GET(endpoint)

All attributes that have GET methods attached can be called through the get(endpoint) function. Where the param is the endpoint. (endpoints overview: http://goo.gl/s0zf63)

_Note: Always include the complete path, like '/lists' or '/lists/{list_id}/interest-categories'_

Example:
```js
mailchimp
	.get('/lists')
	.then(function (response) {
		console.log(response);
	})
```
