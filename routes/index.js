var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index', { title: 'Kwest' });
});

/* GET compendium page. */
router.get('/view/:id', function(req, res, next) {
	res.cookie("c_id", req.params.id);
	res.sendFile('compendium.html', { root: __dirname + "/../public", title: "Kwest: Compendium" });
});

module.exports = router;
