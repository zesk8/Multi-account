/*
	Initialize instaces for different databases.
	These instances will be dynamic depending of the result of a previous query
 */

var Sequelize = require('sequelize'),
	fooDB = new Sequelize('foo', 'root', ''),
	barDB = new Sequelize('bar', 'root', '');
/*
	Export instances
 */
module.exports = {
	foo: fooDB,
	bar: barDB
};
