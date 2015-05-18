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
	//var user = require('./model').User(foo);
	// Raw query
	var queries = [
		"SELECT min.nombre, pro.clave, min.fecha, min.inicio, min.fin FROM minuta as min JOIN proyectos as pro ON pro.id = min.proyectos_id WHERE min.id = 578;",
		"SELECT user.username, profile.nombre FROM sf_guard_user AS user JOIN sf_guard_user_profile AS profile ON user.id = profile.user_id WHERE user.id IN (SELECT user_id FROM minuta_usuario WHERE minuta_id = 578);",
		"SELECT tareas.id, tareas.nombre AS nombre, pro.clave AS clave, prio.prioridad AS prioridad, state.tipo_gtd AS estado, tareas.incio AS inicio, tareas.entrega_al_cliente AS entrega, grup.entregable AS agrupador, resp.nombre AS responsable, resp_user.username AS responsable_usuario, solc.nombre AS solictante, solc_user.username AS solictante_usuario  FROM vop AS tareas JOIN minuta_tarea AS minutas on tareas.id = minutas.vop_id INNER JOIN sf_guard_user_profile AS resp ON resp.user_id = tareas.id_usuario INNER JOIN sf_guard_user AS resp_user ON resp_user.id = tareas.id_usuario INNER JOIN sf_guard_user_profile AS solc ON solc.user_id = tareas.id_usuario_solicitante INNER JOIN sf_guard_user AS solc_user ON solc_user.id = tareas.id_usuario_solicitante INNER JOIN proyectos AS pro ON pro.id = tareas.id_proyecto INNER JOIN prioridades AS prio ON prio.id = tareas.id_prioridad INNER JOIN vop_tipo_gtd AS state ON state.id = tareas.id_tipo_gtd INNER JOIN proyectos_entregables AS grup ON grup.id = tareas.id_entregable WHERE minutas.minuta_id = 578;",
		"SELECT tareas.nombre AS tarea, comment.nombre AS comentarios, user.username AS usuario, name.nombre AS nombre_de_usuario, comment.created_at AS fecha FROM vop AS tareas JOIN minuta_tarea AS minutas on tareas.id = minutas.vop_id INNER JOIN comentarios AS comment ON tareas.id = comment.id_en_tabla INNER JOIN sf_guard_user_profile AS name ON name.user_id = comment.id_usuario INNER JOIN sf_guard_user AS user ON user.id = comment.id_usuario WHERE minutas.minuta_id = 578;"
	].join(' ');

	foo.query(queries, { type: foo.QueryTypes.SELECT }).then(function(results){
		res.send(JSON.stringify(results));
	});
});
/*
	Bar installation
 */
app.get('/bar', function(req, res) {
	// Get sequelize instance
	var	bar = app.get('connections').bar;
	// Require model and pass instance
	//var user = require('./model').User(bar);
	// Raw query
	var queries = [
		"SELECT tareas.id, tareas.nombre AS nombre, pro.clave AS clave, prio.prioridad AS prioridad, state.tipo_gtd AS estado, tareas.incio AS inicio, tareas.entrega_al_cliente AS entrega, grup.entregable AS agrupador, resp.nombre AS responsable, resp_user.username AS responsable_usuario, solc.nombre AS solictante, solc_user.username AS solictante_usuario FROM vop AS tareas INNER JOIN sf_guard_user_profile AS resp ON resp.user_id = tareas.id_usuario INNER JOIN sf_guard_user AS resp_user ON resp_user.id = tareas.id_usuario INNER JOIN sf_guard_user_profile AS solc ON solc.user_id = tareas.id_usuario_solicitante INNER JOIN sf_guard_user AS solc_user ON solc_user.id = tareas.id_usuario_solicitante INNER JOIN proyectos AS pro ON pro.id = tareas.id_proyecto INNER JOIN prioridades AS prio ON prio.id = tareas.id_prioridad INNER JOIN vop_tipo_gtd AS state ON state.id = tareas.id_tipo_gtd INNER JOIN proyectos_entregables AS grup ON grup.id = tareas.id_entregable WHERE tareas.id = 53030"
		].join(' ');

	bar.query(queries, { type: bar.QueryTypes.SELECT }).then(function(results){
		res.send(JSON.stringify(results));
	});
});

app.listen(3000, function(){
	console.log('listen on port 3000');
});