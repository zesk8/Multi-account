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

exports.Clock = function(sequelize) {
	return sequelize.define('clock', {
        id:             Sequelize.INTEGER,
        created_at:     Sequelize.DATE,
        id_usuario:     Sequelize.INTEGER,
        fecha_y_hora:   Sequelize.DATE,
        es_entrada:     Sequelize.BOOLEAN,
        comentario:     Sequelize.STRING,
        es_automatica:  Sequelize.BOOLEAN,
        es_importacion: Sequelize.BOOLEAN
	}, {
		timestamps: false,
		underscored: true,
		tableName: 'in_and_out'
	});
};