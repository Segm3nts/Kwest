// Create the Vue instance
let vueinst = Vue.createApp({
	data: function() {
		return {
			compendia: [
				{
					c_id: 1,
					dm: "Michael",
					name: "Anderim",
					timestamp: "2021-09-28"
				}
			],
			isSettings: false,
			settings: {}
		};
	},
	methods: {
		create(event) {
			this.settings.players.push({
				name: "",
				realname: ""
			});
		},
		remove(p_id) {
			for (let i = 0; i < this.settings.players.length; i++) {
				if (this.settings.players[i].p_id == p_id) {
					this.settings.players.splice(i, 1);
				}
			}
		},
		save(event) {
			updateCompendium(this.settings);
		},
		close(event) {
			this.isSettings = false;
		},
		remove(event) {
			if (confirm("Are you sure you want to DELETE this compendium?")) {
				var id = this.settings.c_id;
				var pwd = prompt("Please enter the compendium password to DELETE this compendium");
				/* 1. Create new AJAX request */
				var xhttp = new XMLHttpRequest();
				/* 4. Handle response (callback function) */
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						vueinst.isSettings = false;
						for (let i = 0; i < vueinst.compendia.length; i++) {
							if (vueinst.compendia[i].c_id == id) {
								vueinst.compendia.splice(i, 1);
								break;
							}
						}
					}
				};
				/* 2. Open connection */
				xhttp.open("POST", "/compendium/delete", true);
				/* 3. Send request */
				xhttp.setRequestHeader("Content-type", "application/json");
				xhttp.send(JSON.stringify({
					c_id: id,
					password: pwd
				}));
			}
		},
		parseTimestamp(timestamp) {
			if (timestamp == undefined) {
				return;
			}
			// Parse the string: date
			var day = parseInt(timestamp[8] + timestamp[9]);
			var month = parseInt(timestamp[5] + timestamp[6]);
			var year = parseInt(timestamp[0] + timestamp[1] + timestamp[2] + timestamp[3]);
			// Parse the string: time
			var hours = parseInt(timestamp[11] + timestamp[12]);
			var minutes = parseInt(timestamp[14] + timestamp[15]);
			// Timezone: +9:30
			hours += 10;
			minutes += 30;
			if (minutes > 59) {
				hours++;
				minutes -= 60;
			}
			if (hours > 23) {
				day++;
				hours -= 24;
				if (day > 28 && month == 2) {
					month++;
					day -= 28;
				} else if (day > 30 && (month == 4 || month == 6 || month == 9 || month == 11)) {
					month++;
					day -= 30;
				} else if (day > 31) {
					month++;
					day -= 31;
				}
			}
			if (month > 12) {
				year++;
				month -= 12;
			}
			// Lookup the month name
			switch(month) {
				case 1:
					month = "January";
					break;
				case 2:
					month = "February";
					break;
				case 3:
					month = "March";
					break;
				case 4:
					month = "April";
					break;
				case 5:
					month = "May";
					break;
				case 6:
					month = "June";
					break;
				case 7:
					month = "July";
					break;
				case 8:
					month = "August";
					break;
				case 9:
					month = "September";
					break;
				case 10:
					month = "October";
					break;
				case 11:
					month = "November";
					break;
				case 12:
					month = "December";
					break;
				default:
					console.log("Error! No lookup found for the current month!");
			}
			// Return the formatted timestamp
			return day + " " + month + " " + year
		}
	}
}).mount('#cards');

// Rerouting function
function remove(p_id) {
	vueinst.remove(p_id);
}

// AJAX functions

function getCompendia() {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    vueinst.compendia = JSON.parse(this.response);
		}
	};
	/* 2. Open connection */
	xhttp.open("GET", "/compendium/get", true);
	/* 3. Send request */
	xhttp.send();
}

function getCompendiumSettings(c_id) {
	// Get most of the deets
	for (let i = 0; i < vueinst.compendia.length; i++)
	{
		if (vueinst.compendia[i]["c_id"] == c_id) {
			vueinst.settings = vueinst.compendia[i];
		}
	}
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    vueinst.settings["players"] = JSON.parse(this.response);
		    vueinst.isSettings = true;
		}
	};
	/* 2. Open connection */
	xhttp.open("GET", "/compendium/settings/" + c_id, true);
	/* 3. Send request */
	xhttp.send();
}

function updateCompendium(compendium) {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    vueinst.isSettings = true;
		}
	};
	/* 2. Open connection */
	xhttp.open("POST", "/compendium/settings/update", true);
	/* 3. Send request */
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(compendium));
}

// Check for new compendia
getCompendia();
