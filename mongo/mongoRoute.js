module.exports = function(router, mongodb) {
    router.get('/', function(req, res) {
        res.render('index');
    });
    router.get('/getMainPage', function(req, res) {
    	mongodb.executeQuery(req, res);
    });
    return router; 
};


