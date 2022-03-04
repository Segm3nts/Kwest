var express = require('express');
var router = express.Router();

// GET players corresponding to compendium c_id
router.get('/get/:c_id', function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT * FROM Players WHERE c_id = ?;";
        connection.query(query, [req.params.c_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
        	res.json(rows);
        });
    });
});

module.exports = router;
