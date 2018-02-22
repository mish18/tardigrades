'use strict';

const functions = require('firebase-functions');
const root_api = require('./integrations/root_api.js');
const DialogflowApp = require('actions-on-google').DialogflowApp;

const NAME_ACTION = 'name_action';
const QUOTE_ACTION = 'quote_action';
const GIVEN_NAME_ARGUMENT = 'given-name';
const LAST_NAME_ARGUMENT = 'last-name';
const COVER_AMOUNT_ARGUMENT = 'cover-amount';
const AGE_ARGUMENT = 'age';

exports.tardigrades = functions.https.onRequest((_request, _response) => {
	const app = new DialogflowApp({request: _request, response: _response});
	console.log('Request headers: ' + JSON.stringify(_request.headers));
	console.log('Request body: ' + JSON.stringify(_request.body));
	
	function name_action (app) {
		let given_name = app.getArgument(GIVEN_NAME_ARGUMENT);
		let last_name = app.getArgument(LAST_NAME_ARGUMENT);
		app.tell('Alright, ' + given_name + ' ' + last_name + ' you should totally get insurance.');
	
		root_api.createPolicyholder({  
			id: { 
				type: 'id', number: '2501014800085', country: 'ZA'
			},
			first_name: given_name,
			last_name: last_name,
			email: 'erlich@avaito.com',
			app_data: { company: 'Aviato' }
		});
	}
	
	function quote_action (app) {
		let cover_amount = app.getArgument(COVER_AMOUNT_ARGUMENT);
		let age = app.getArgument(AGE_ARGUMENT);
		app.tell('Got it! You\'re ' + age.amount + ' and you want coverage for ' + cover_amount + '.');
		
		root_api.generateQuote({
			type: 'root_term',
			cover_amount: cover_amount*100,
			cover_period: '2_years',
			basic_income_per_month: 1000000,
			education_status: 'professional_degree',
			smoker: false,
			gender: 'female',
			age: age.amount
		}).then(function(result) {
			console.log(result);
		}).catch(function(err) {
			console.log(err);
		});
		
		//let quote = 'Here\'s your quote!:\nQuote Package ID: ' +r.body['quote_package_id'];
	};
	
	let actionMap = new Map();
	actionMap.set(NAME_ACTION, name_action);
	actionMap.set(QUOTE_ACTION, quote_action);
	
	app.handleRequest(actionMap);
});