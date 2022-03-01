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
				name: "Name",
				realname: "Real Name"
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
			console.log(this.response);
		    //vueinst.settings["players"] = JSON.parse(this.response);
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
