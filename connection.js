/*
	Initialize instaces for different databases.
	These instances will be dynamic depending of the result of a previous query
 */

var Sequelize = require('sequelize'),
	fooDB = new Sequelize('foo', 'root', 'vincoorbis'),
	barDB = new Sequelize('bar', 'root', 'vincoorbis');
/*
	Export instance
 */
module.exports = {
	foo: fooDB,
	bar: barDB
};