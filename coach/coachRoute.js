module.exports = function(router, fs, mongodb) {
    router.get('/', function(req, res) {
        res.render('index');
    });
    router.get('/getMainPage', function(req, res) {
    	mongodb.executeQuery(req, res);
    });
    router.get('/getDummyJson', function(req, res) {
    	fs.readFile('./client/coach/json/dummy.json', function(err, data) {
    		if (err) throw err
    		var obj = JSON.parse(data)
    		res.json(obj);
    	});
    });
    return router; 
};


