-- Set the database up
DROP SCHEMA IF EXISTS kwest;
CREATE SCHEMA kwest;
USE kwest;

CREATE TABLE Compendia (
	c_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(63) NOT NULL,
	dm VARCHAR(15) NOT NULL,
	timestamp DATE NOT NULL,
	password VARCHAR(31) NOT NULL,
	PRIMARY KEY (c_id)
);

CREATE TABLE Icons (
	i_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(15) UNIQUE NOT NULL,
	style VARCHAR(23) UNIQUE NOT NULL,
	PRIMARY KEY (i_id)
);

CREATE TABLE Players (
	p_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	c_id INT UNSIGNED NOT NULL,
	name VARCHAR(63) NOT NULL,
	realname VARCHAR(63) NOT NULL,
	PRIMARY KEY (p_id),
	FOREIGN KEY (c_id) REFERENCES Compendia (c_id)
);

CREATE TABLE Journals (
	j_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	c_id INT UNSIGNED NOT NULL,
	title VARCHAR(63) NOT NULL,
	description TEXT,
	timestamp TIMESTAMP NOT NULL,
	i_id INT UNSIGNED NOT NULL,
	PRIMARY KEY (j_id),
	FOREIGN KEY (c_id) REFERENCES Compendia (c_id),
	FOREIGN KEY (i_id) REFERENCES Icons (i_id)
);

CREATE TABLE Entries (
	e_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	title TINYTEXT,
	timestamp TIMESTAMP NOT NULL,
	content TEXT NOT NULL,
	PRIMARY KEY (e_id)
);

CREATE TABLE Tags (
	e_id INT UNSIGNED NOT NULL,
	j_id INT UNSIGNED NOT NULL,
	PRIMARY KEY (e_id, j_id),
	FOREIGN KEY (e_id) REFERENCES Entries (e_id),
	FOREIGN KEY (j_id) REFERENCES Journals (j_id)
);

-- Create the icons
INSERT INTO Icons (name, style) VALUES ("Person", "fa-user");
INSERT INTO Icons (name, style) VALUES ("House", "fa-house-chimney");
INSERT INTO Icons (name, style) VALUES ("Map", "fa-map-location-dot");
INSERT INTO Icons (name, style) VALUES ("Compass", "fa-compass");
INSERT INTO Icons (name, style) VALUES ("Book", "fa-book");
INSERT INTO Icons (name, style) VALUES ("Running", "fa-person-running");
INSERT INTO Icons (name, style) VALUES ("Potion", "fa-flask-round-potion");
