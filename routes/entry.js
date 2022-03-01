var express = require('express');
var router = express.Router();

router.get("/new/:j_id", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        // Make new entry
        var query = "INSERT INTO Entries (title, content, timestamp) VALUES ('', '', CURRENT_TIMESTAMP());";
        connection.query(query, [], function(err, rows, fields) {
            if (err) {
            	console.log(err)
                res.sendStatus(500);
                return;
            }
            // Get the entry id
            var query = "SELECT MAX(e_id) FROM Entries;";
		    connection.query(query, [], function(err, rows, fields) {
		        if (err) {
		        	console.log(err)
		            res.sendStatus(500);
		            return;
		        }
		        // Link it with a tag
		        var query = "INSERT INTO Tags (e_id, j_id) VALUES (?, ?);";
				connection.query(query, [rows[0], req.params.j_id], function(err, rows, fields) {
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
    });
});

module.exports = router;
