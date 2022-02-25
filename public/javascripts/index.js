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
	}
}).mount('#cards');

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
		if (i == c_id) {
			vueinst.settings = vueinst.compendia[i];
		}
	}
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    console.log(this.responseText);
		    ret_obj = JSON.parse(this.response);
		}
	};
	/* 2. Open connection */
	xhttp.open("GET", "/compendium/settings/" + c_id, true);
	/* 3. Send request */
	xhttp.send();
}

// Check again for new compendia every 10 seconds
getCompendia();
setInterval(getCompendia, 10000);
