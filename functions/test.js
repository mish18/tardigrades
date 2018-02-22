const root_api = require('./integrations/root_api.js');

root_api.generateQuote({
	type: 'root_term',
	cover_amount: 10000100,
	cover_period: '2_years',
	basic_income_per_month: 1000000,
	education_status: 'professional_degree',
	smoker: false,
	gender: 'female',
	age: 23
}).then(function(result) {
			console.log(result);
		}).catch(function(err) {
			console.log(err);
		});
//console.log(r);