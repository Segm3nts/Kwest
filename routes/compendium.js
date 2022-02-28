var express = require('express');
var router = express.Router();

// Create compendium page
router.get("/new", function(req, res, next) {
	res.sendFile('new_compendium.html', { root: __dirname + "/../public/", title: "Kwest: Create new compendium" });
});

router.post("/new", function(req, res, next) {
    req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        // Create the compendium
        var currentDate = new Date();
        var query = "INSERT INTO Compendia (name, dm, password, timestamp) VALUES (?, ?, ?, CONVERT(?, DATE) );";
        connection.query(query, [req.body["name"], req.body["dm"], req.body["password"], currentDate], function(err, rows, fields) {
            if (err){
            	console.log("one");
                res.sendStatus(500);
                return;
            }
            // Find out c_id
		    var query = "SELECT MAX(c_id) FROM Compendia;";
		    let compendium_id = 0;
		    connection.query(query, function(err, rows, fields) {
		        if (err){
		        	console.log("two");
		            res.sendStatus(500);
		            return;
		        }
		        compendium_id = rows[0]["MAX(c_id)"];
		        // Create the player
				var query = "INSERT INTO Players (c_id, name, realname) VALUES (?, 'Dungeon Master', ?);";
				connection.query(query, [compendium_id, req.body["dm"]], function(err, rows, fields) {
				    connection.release();
				    if (err){
				    	console.log(err);
				        res.sendStatus(500);
				        return;
				    }
				    res.redirect("/");
				});
		    });
        });
    });
});

// GET all compendia
router.get("/get", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT c_id, name, dm, timestamp FROM Compendia;";
        connection.query(query, [req.params.id], function(err, rows, fields) {
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

// GET the bare compendium options (for a dropdown)
router.get("/options", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT c_id, name FROM Compendia;";
        connection.query(query, [req.params.id], function(err, rows, fields) {
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

// Get the compendium settings for c_id
router.get("/settings/:c_id", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT Players.name, p_id, realname FROM Compendia INNER JOIN Players ON Compendia.c_id = Players.c_id WHERE Compendia.c_id = ? AND Players.name != 'Dungeon Master';";
        connection.query(query, [req.params.c_id], function(err, rows, fields) {
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

// Update compendium settings
router.post("/settings/update", function(req, res, next) {
	req.pool.getConnection(function(err, connection)
    {
        if (err) {
            res.sendStatus(500);
            return;
        }
        // Update compendium info
        var query = "UPDATE Compendia SET dm = ?, name = ? WHERE c_id = ?;";
        connection.query(query, [req.body.dm, req.body.name, req.body.c_id], function(err, rows, fields) {
            if (err) {
            	console.log(err)
                res.sendStatus(500);
                return;
            }
        });
        // Remove players
        var query = "DELETE FROM Players WHERE c_id = ? AND name != 'Dungeon Master';";
        connection.query(query, [req.body.c_id], function(err, rows, fields) {
            connection.release();
            if (err) {
            	console.log(err)
                res.sendStatus(500);
                return;
            }
        });
        // Add players
        for (let i = 0; i < req.body.players.length; i++) {
        	var query = "INSERT INTO Players (c_id, name, realname) VALUES (?, ?, ?);";
		    connection.query(query, [req.body.c_id, req.body.players[i].name, req.body.players[i].realname], function(err, rows, fields) {
		        connection.release();
		        if (err) {
		        	console.log(err)
		            res.sendStatus(500);
		            return;
		        }
		    	res.sendStatus(200);
		    });
        }
    });
});

module.exports = router;
