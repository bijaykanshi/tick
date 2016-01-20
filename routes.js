var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var query;
var fs = require('fs');
//var makedirp = require('mkdirp');
var storeProc = 'CREATE DEFINER=root@localhost PROCEDURE bijay ()'
module.exports = function(app, dbconnection) {

	app.get('/', function(req, res){
		res.render(dbconnection.first);
	});
	app.post('/updateProfile', function(req, res) {
		var body = req.body;
		query = 'insert into users ( username , passward, emailid, contactNo, localAddress, zip, country, state, district, profession) values ('+"'"+body.yourName+"'"+','+"'"+body.password+"'"+','+"'"+body.email+"'"+','+"'"+body.contactNo+"'"+','+"'"+body.localAddress+"'"+','+"'"+body.zip+"'"+','+"'"+body.country+"'"+','+"'"+body.state+"'"+','+"'"+body.district+"'"+','+"'"+body.profession+"'"+');';
		dbconnection.applyQueryIntoDataBase(query, 'updateProfile', res);
	});
	app.get('/getListOfPeople', function(req, res) {
		query = 'select * from users';
		dbconnection.applyQueryIntoDataBase(query, 'getListOfPeople', res);
	});
	app.post('/submitContact', function(req, res) {
		query = 'insert into contactUs (id, subject, msg) values ('+"'"+req.body.id+"'"+','+"'"+req.body.subject+"'"+','+"'"+req.body.msg+"'"+');';
		dbconnection.applyQueryIntoDataBase(query, 'submitContact', res);
	});
	app.post('/loginSignUp', function(req, res) {
		var dec = req.body.dec,
			query1,
			arr;
		console.log(dec)
		if (dec === 'login') {
			var myPos = req.body.myPos;
	    	if (myPos && myPos.lat) {
	    		query = 'update users set lattitude = "'+ myPos.lat +'", longitude = "'+ myPos.lng +'", online = true where email = "' + req.body.email + '";';
	    	
	    	} else {
	    		query = 'update users set  online = true where email = "' + req.body.email + '";';
	    	}
			query += 'SELECT * FROM users WHERE EXISTS(SELECT name FROM users WHERE email ='+ "'"+req.body.email+"'"+ ' and password =' + "'"+req.body.password+"'" + ' );';
			
		} else if (dec === 'edit_website') {
			query = 'SELECT access_token FROM users WHERE email ='+ "'"+req.body.email+"'"+ ' and password =' + "'"+req.body.password+"'" + ';';
			
		} else {
			var random,
				parameterToPass = {};
			if (dec === 'coach') {
				random = Math.floor(Math.random() * 1000000000);
				parameterToPass.access_token = req.body.email + random;
			}
			query = 'insert into users ( name , password, email, lattitude, longitude, country, state, district, Pin_Code, msg, contact_No, Address, org, sex, access_token) values ('+"'"+req.body.name+"'"+','+"'"+req.body.password+"'"+','+"'"+req.body.email+"'"+','+"'"+req.body.myPos.lat+"'"+','+"'"+req.body.myPos.lng+"'"+','+"'"+req.body.country+"'"+','+"'"+req.body.state+"'"+','+"'"+req.body.district+"'"+','+"'"+req.body.Pin_Code+"'"+','+"'"+req.body.msg+"'"+','+"'"+req.body.contact_No+"'"+','+"'"+req.body.Address+"'"+','+"'"+req.body.org+"'"+','+req.body.sex+','+"'"+random+"'"+');';
			query1 = 'insert into skillProfession  values';
			req.body.professionSkill.Profession.forEach(function(x){query1 += '(LAST_INSERT_ID() ,' + "'" + x +"'" + ', false),'  });
			req.body.professionSkill.Skills.forEach(function(x){query1 += '(LAST_INSERT_ID() ,' + "'" + x +"'" + ', true),'  });
			query += query1.substring(0, query1.length-1) + ';';
			//console.log (query);
			/*arr = [storeProc, 'BEGIN', query, query1, 'END'];
			dbconnection.storedProcedure(query, query1, dec, res, req, arr);*/
			parameterToPass.email = req.body.email;
		}
		console.log('email' + req.body.email);
		dbconnection.applyQueryIntoDataBase(query, dec, res, req, parameterToPass);
		
	});
	app.get('/getPeopleListBasedOnCity', function(req, res) {
		query = 'SELECT * FROM users WHERE country ='+ "'"+req.query.country+"'"+ ' and district =' + "'"+req.query.district+"'" + ';'
		dbconnection.applyQueryIntoDataBase(query, 'sendRows', res);
	});
	app.get('/getPreviousMsg', function(req, res) {
		query = 'SELECT * FROM chat WHERE id ='+ "'"+req.query.id+"'"+ 'order by date desc limit ' + req.query.start + ',50;'
		dbconnection.applyQueryIntoDataBase(query, 'getPreviousMsg', res);
	});
	/*app.get('/logout', function(req, res) {
		query = 'update users set online = false where id ='+ "'"+req.query.id+"'"+ ';'
		dbconnection.applyQueryIntoDataBase(query, 'logout', res);
	});*/
	app.post('/filterPeople', function(req, res) {
		query = 'SELECT * FROM users where  ';
		req.body.District.forEach(function(x) {query += 'district = ' + "'" + x + "'" + 'or'});
		query = query.substring(0, query.length - 2);
		dbconnection.applyQueryIntoDataBase(query, 'filterPeople', res);
	});
	app.post('/fileUpload', multipartMiddleware, function(req, res) {
		  var files = req.files,
		  		id = req.body.id,
		  		name = files.file.name,
		  		relativePath = 'client/images/peopleList';
		  console.log(id);
		  var directory = __dirname + '/' + relativePath;
		  //makedirp.sync(directory);
		  var readStream = fs.createReadStream(files.file.path);
		  var writeStream = fs.createWriteStream(relativePath + '/' + id);
		  readStream.pipe(writeStream);
		  res.send('imageupload');
	});
	setTimeout(function(){ dbconnection.a = true; }, 10800000);
};


