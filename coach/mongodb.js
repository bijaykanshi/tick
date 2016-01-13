var MongoClient = require('mongodb').MongoClient;
var mongodb = {};
var url = 'mongodb://localhost:27017/mydb';
/*mongodb.mysqlToMongoDataInsert = function (rows) {
	MongoClient.connect('mongodb://127.0.0.1:27017', function(err, db) {
	  if (err) throw err;
	  console.log("Connected to Database");
	  for (var i = 0; i < rows.length; i += 1) {
	  	var document = {name: rows[i].username, lattitude: rows[i].lattitude};
	  
		//insert record
		db.collection('users').insert(document, function(err, records) {
			if (err) throw err;
			console.log("Record added as ");
		});
	  }
		
	});
} */
mongodb.executeQuery = function(req, res) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log("Connected to Database kkskf");
	 /* var collection = db.collection('mainPage');

    //Create some users
    var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
    var user2 = {name: 'modulus user', age: 22, roles: ['user']};
    var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

    // Insert some users
    collection.insert([user1, user2, user3], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
  })*/
      //Close connection
      //db.close();
	  db.collection('mainPage', function(err, collection1) {
		    if (err) throw err;
		    console.log('mainPage');
		    //res.send(collection);
		    collection1.find({"id":"1"}).toArray(function(error, documents) {
		    	console.log('mainPage' + documents);
			    if (err) throw error;
			    console.log('mainPage' + documents);
			    res.send(documents);
			});
	  });
	});
}
module.exports =  mongodb;
   
