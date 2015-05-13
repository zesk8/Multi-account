/*
	Simple model
 */

var Sequelize = require('sequelize');

exports.User = function(sequelize) {

	return sequelize.define('user', {
		id:   Sequelize.INTEGER,
		name: Sequelize.STRING
	});
};