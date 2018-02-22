const request = require("request");
const EventEmitter = require('events');

const root_event_handler = new EventEmitter();

let base_uri = 'https://sandbox.root.co.za/v1/insurance/';

let request_headers = {
	'Postman-Token': '7d561324-b4a8-4ecd-73fd-ead043416304',
	'Cache-Control': 'no-cache',
	'Authorization': 'Basic OGJkYzI4ZTYtNjcyZS00YjdhLTg1ZWQtYTVjYTBhYmY5YTAzOmFVb2pxbGlSZlppZjNBNFE4cGR6d1V3T3I0eGJ3MW81',
	'Content-Type': 'application/json' }; 

let request_response = null;
	
function options(method, body) {
	return {
	  method: 'POST',
	  url: base_uri + method,
	  headers: request_headers,
	  body: body,
	  json: true
	}
};
  
exports.createPolicyholder = function(body) {
	request(options('policyholders', body), function (error, response, r_body) {
		//(error) throw new Error(error);

		//console.log(body);
		return response;
	});
};

exports.generateQuote = function(body) {
	return new Promise(function(resolve, reject) {
		request(options('quotes', body), function (error, response, r_body) {
			if (error) {
				reject(error);
			} else {
				resolve(response.body);
			}
		});
	});
};