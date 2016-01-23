
module.exports = function(ref) {
    var path = ref.path;
    var jsonPath = path.join(__dirname, '..', '..', 'serverData', 'coach', 'json');
    var query = '';
    var fs = ref.fs;
    console.log(jsonPath);
    var routingData = [{
            'url': '/',
            'method': 'get',
            'callbackFun': function(req, res) {
                res.render('index');
            }
        },
        {
            'url': '/getMainPage',
            'method': 'get',
            'callbackFun':  function(req, res) {
                fs.readFile(path.join(jsonPath, 'defaultWebsite.json'), function(err, data) {
                    if (err) throw err
                    var obj = JSON.parse(data)
                    res.json(obj);
                });
                console.log('success in recieving msg');
            }
        },
        {
            'url': '/getDummyJson',
            'method': 'get',
            'callbackFun':  function(req, res) {
                fs.readFile(path.join(jsonPath, 'dummy.json'), function(err, data) {
                    if (err) throw err
                    var obj = JSON.parse(data)
                    res.json(obj);
                });
            }
        },
        {
            'url': '/saveJson',
            'method': 'post',
            'callbackFun':  function(req, res) {
                console.log('getting');
                console.log(req.body.email);
                ref.jsonfile.writeFile(path.join(jsonPath, req.body.email + '.json'), req.body.data, function (err) {
                  console.log(err);
                  console.log('error in writing');
                });
                res.send('success');
            }
        },
        {
            'url': '/getOrg',
            'method': 'get',
            'callbackFun':  function(req, res) {
                query = 'select * from users where org is NOT NULL';
                ref.dbconnection.applyQueryIntoDataBase(query, 'getOrg', res);
            }
        },
        {
            'url': '/getWebsiteJson',
            'method': 'get',
            'callbackFun':  function(req, res) {
                var query1 = ref.url.parse(req.url, true).query;
                console.log(query1);
                console.log(req.query.email, req.body.email);
                var finalPath = path.join(jsonPath, query1.email + '.json');
                console.log('finalPath' + finalPath);
                fs.readFile(finalPath, function(err, data) {
                    if (err) throw err
                    var obj = JSON.parse(data);
                    res.json(obj);
                });
            }
        }
    ]; 

    /*router.get('/', function(req, res) {
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
    });*/
    routingData.forEach(function(obj) {
       ref.router[obj.method](obj.url, obj.callbackFun); 
    });
    return ref.router; 
};


