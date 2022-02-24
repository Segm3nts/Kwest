var express = require('express');
var router = express.Router();

/* GET compendium page. */
router.get('/:id', function(req, res, next) {
	res.sendFile('compendium.html', { root: __dirname + "/../public/", title: "Kwest: Compendium " + req.params.id });
});

module.exports = router;
