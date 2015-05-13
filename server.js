var express = require('express'),
	app = express();
/*
	Require and set connections in order to don't reconnect again and again
 */
app.set('connections', require('./connection'));
/*
	Default Route
 */
app.get('/', function(req, res){
	res.render('index.jade', {
		title: 'Home page'
	});
});
/*
	Foo installation
 */
app.get('/foo', function(req, res) {
	// Get sequelize instance
	var	foo = app.get('connections').foo;
	// Require model and pass instance
	var user = require('./model').User(foo);

	user.create({ name: "moon"}).then(function () {
		user.findAll({raw: true}).then(function (users) {
			console.log(users);
		});
	});

    res.render('index.jade', {
		title: 'Foo page'
	});
});
/*
	Bar installation
 */
app.get('/bar', function(req, res) {
	// Get sequelize instance
	var	bar = app.get('connections').bar;
	// Require model and pass instance
	var user = require('./model').User(bar);
	
	user.create({ name: "sun" }).then(function () {
		user.findAll({ raw: true }).then(function (users) {
			console.log(users);
		});
	});

	res.render('index.jade', {
		title: 'Bar page'
	});
});

app.listen(3000, function(){
	console.log('listen on port 3000');
});