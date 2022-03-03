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
        var query = "SELECT j_id, title, description, timestamp, style FROM Journals INNER JOIN Icons ON Journals.i_id = Icons.i_id WHERE c_id = ?;";
        connection.query(query, [req.cookies.c_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            let repeat_id = new Set();
            for (let i = 0; i < rows.length; i++) {
            	if (repeat_id.has(rows[i].j_id)) {
            		rows.splice(i, 1);
            		i--;
            	} else {
            		repeat_id.add(rows[i].j_id);
            	}
            }
        	res.json(rows);
        });
    });
});

// Create new journal based on current campaign
router.get("/new", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "INSERT INTO Journals (c_id, title, description, timestamp, i_id) VALUES (?, 'Title', 'Description', CURRENT_TIMESTAMP(), 1);";
        connection.query(query, [req.cookies.c_id], function(err, rows, fields) {
            if (err) {
                res.sendStatus(500);
                return;
            }
            var query = "SELECT * FROM Journals WHERE c_id = ?;";
			connection.query(query, [req.cookies.c_id], function(err, rows, fields) {
			    connection.release();
			    if (err) {
			        res.sendStatus(500);
			        return;
			    }
				res.json(rows);
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
        // Find i_id
        var currentDate = new Date();
        var query = "SELECT i_id FROM Icons WHERE style = ?;";
        connection.query(query, [req.body.style], function(err, firstrows, fields) {
            if (err){
                res.sendStatus(500);
                return;
            }
            // Update the journal
		    var query = "UPDATE Journals SET title = ?, description = ?, i_id = ? WHERE j_id = ?;";
		    connection.query(query, [req.body.title, req.body.description, firstrows[0]["i_id"], req.body.j_id], function(err, secondrows, fields) {
		    	connection.release();
		        if (err){
		            res.sendStatus(500);
		            return;
		        }
		        res.sendStatus(200);
		    });
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
                res.sendStatus(500);
                return;
            }
        	res.json(rows);
        });
    });
});

// Get list of icons
router.get("/icons", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT * FROM Icons;";
        connection.query(query, [req.params.j_id], function(err, rows, fields) {
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
