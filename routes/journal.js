var express = require('express');
var router = express.Router();

// GET all journals
router.get("/get", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT j_id, title, description, timestamp, style FROM Journals INNER JOIN Icons WHERE c_id = ?;";
        connection.query(query, [req.cookies.c_id], function(err, rows, fields) {
            connection.release();
            if (err) {
            	console.log(err)
                res.sendStatus(500);
                return;
            }
            let repeat_id = 0;
            for (let i = 0; i < rows.length; i++) {
            	if (repeat_id == rows[i].j_id) {
            		rows.splice(i, 1);
            		i--;
            	} else {
            		repeat_id = rows[i].j_id;
            	}
            }
        	res.json(rows);
        });
    });
});

router.get("/fetch/:j_id", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT title, timestamp, content FROM Entries INNER JOIN Tags WHERE j_id = ?;";
        connection.query(query, [req.params.j_id], function(err, rows, fields) {
            connection.release();
            if (err) {
            	console.log(err)
                res.sendStatus(500);
                return;
            }
        	res.json(rows);
        });
    });
});

module.exports = router;
