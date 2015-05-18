/*
	Initialize instaces for different databases.
	These instances will be dynamic depending of the result of a previous query
 */

var Sequelize = require('sequelize'),
	fooDB = new Sequelize('md_vinco', 'root', '', {
		dialect: 'mysql',
		dialectOptions: {
			multipleStatements: true
		}
	}),
	barDB = new Sequelize('md_gt', 'root', '', {
		dialect: 'mysql',
		dialectOptions: {
		multipleStatements: true
		}
	});
/*
	Export instances
 */
module.exports = {
	foo: fooDB,
	bar: barDB
};
