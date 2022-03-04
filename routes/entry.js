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
                res.sendStatus(500);
                return;
            }
            // Get the entry id
            var query = "SELECT MAX(e_id) FROM Entries;";
		    connection.query(query, [], function(err, rows, fields) {
		        if (err) {
		            res.sendStatus(500);
		            return;
		        }
		        // Link it with a tag
		        var query = "INSERT INTO Tags (e_id, j_id) VALUES (?, ?);";
				connection.query(query, [rows[0]["MAX(e_id)"], req.params.j_id], function(err, rows, fields) {
				    connection.release();
				    if (err) {
		        		console.log(err);
				        res.sendStatus(500);
				        return;
				    }
					res.json(rows);
				});
		    });
        });
    });
});

router.post("/save", function(req, res, next) {
    req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var currentDate = new Date();
        var query = "UPDATE Entries SET title = ?, content = ? WHERE e_id = ?;";
        connection.query(query, [req.body.title, req.body.content, req.body.e_id], function(err, firstrows, fields) {
            if (err){
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    });
});

router.get("/delete/:e_id", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        // Remove all tags on the entry
        var query = "DELETE FROM Tags WHERE e_id = ?;";
        connection.query(query, [req.params.e_id], function(err, rows, fields) {
            if (err) {
                res.sendStatus(500);
                return;
            }
            // Remove the entry
		    var query = "DELETE FROM Entries WHERE e_id = ?;";
		    connection.query(query, [req.params.e_id], function(err, rows, fields) {
		        if (err) {
		            res.sendStatus(500);
		            return;
		        }
		        res.sendStatus(200);
		    });
        });
    });
});

module.exports = router;
