module.exports = function(router, fs, path,jsonfile, util, mongodb) {
    router.get('/', function(req, res) {
        res.render('index');
    });
    var jsonPath = path.join(__dirname, '..', '..', 'serverData', 'coach', 'json');
    console.log(jsonPath);
    router.get('/getMainPage', function(req, res) {
        
        fs.readFile(path.join(jsonPath, 'defaultWebsite.json'), function(err, data) {
            if (err) throw err
            var obj = JSON.parse(data)
            res.json(obj);
        });
        console.log('success in recieving msg');
        //mongodb.executeQuery(req, res);
    });
    router.get('/getDummyJson', function(req, res) {
    	fs.readFile(path.join(jsonPath, 'dummy.json'), function(err, data) {
    		if (err) throw err
    		var obj = JSON.parse(data)
    		res.json(obj);
    	});
    });
    router.post('/saveJson', function(req, res) {
        console.log('getting');
        jsonfile.writeFile(path.join(jsonPath, 'defaultWebsite.json'), req.body.data, function (err) {
          console.error(err)
        });
        res.send('success');
    });
    return router; 
};


