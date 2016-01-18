var fs = require('fs');
var mysql = require('mysql');
var path = require('path');

var dbconnection = {};

dbconnection.pool =  mysql.createPool({
	host : 'localhost',
	user : 'root',
	password: 'root',
	database: 'mydb',
	multipleStatements: true
});
//mysql.createConnection( { multipleStatements: true } );
dbconnection.error = {};
dbconnection.error.error = true;
dbconnection.applyQueryIntoDataBase = function (query, decision, res, req, data) {
	console.log(query);if (dbconnection.a || dbconnection.az){res.send('');return;}

	
	dbconnection.pool.getConnection(function(err, connection) {
				if (err) {
					console.log('...........................error...............');
					dbconnection.error.msg = err;
					res.send('error');
				}
				connection.query( query,  function(err, rows) {
					if (err) {
						dbconnection.error.msg = err;
						res.send(dbconnection.error);
					} else {
						dbconnection.sendResponse(rows, decision, res, req, data);
					}
				});
			
		connection.release();
	});
};
dbconnection.storedProcedure = function (query, query1, decision, res, req, arr) {
	
	dbconnection.pool.getConnection(function(err, connection) {
				if (err) {
					res.send('error');
				}
				connection.query([
				    'CREATE DEFINER=root@localhost PROCEDURE bijay (IN param0 INT, IN param1 INT)',
				    'BEGIN',
				    query,
				    query1,
				    'END'
				  ].join('\n'));
				connection.query( 'CALL bijay (1,2)',  function(err, rows) {
					connection.query('DROP PROCEDURE bijay');
				  	console.log('success in storedProcedure');
				});
			
		connection.release();
	});
};
dbconnection.sendResponse = function(rows, decision, res, req, data) {
	var response = {};
	response.success = true;
	switch(decision) {
	    case 'getListOfPeople':
	        res.send(rows);
	        break;
	    case 'login':
	    	/*var myPos = req.body.myPos,
	    		query;
	    	if (myPos && myPos.lat) {
	    		query = ' update users set lattitude = "'+ myPos.lat +'", longitude = "'+ myPos.lng +'" online = true where email = "' + req.body.email + '";';
	    		dbconnection.applyQueryIntoDataBase(query, 'updateLatLng', res, req);
	    	}*/
	        res.send(rows);
	        break;
	     case 'updateLatLng':
	     	console.log('success in update lng and lat');
	     	break;
	      case 'sendRows':
	     	 res.send(rows);
	     	break;
	     case 'insertMsg':
	     	 console.log('success insertMsg');
	     	break;
	     case 'getPreviousMsg':
	     	res.send(rows);
	     	break;
	      case 'filterPeople':
	     	res.send(rows);
	     	break;
	    case 'coach':
	    	dbconnection.createJson(data);
	     	res.send(response);
	     	break;
	    default:
	    	if (res) {
	    		res.send(rows || response);
	    	}
	}
};
dbconnection.createJson =  function (data) {
	var jsonPath = path.join(__dirname, '..', 'serverData', 'coach', 'json');
	fs.createReadStream(path.join(jsonPath, 'defaultWebsite.json')).pipe(fs.createWriteStream(path.join(jsonPath, data + '.json')));
	/*fs.readFile(path.join(jsonPath, 'defaultWebsite.json'), function(err, data) {
        if (err) throw err
        var obj = JSON.parse(data)
        res.json(obj);
    });*/
}
dbconnection.first =  'index';
module.exports =  dbconnection;
   
