// Create the Vue instance
let vueinst = Vue.createApp({
	data: function() {
		return {
			compendia: [
				{
					c_id: 1,
					name: "Anderim"
				}
			]
		};
	}
}).mount('#cards');

/* 1. Create new AJAX request */
var xhttp = new XMLHttpRequest();

/* 4. Handle response (callback function) */
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    vueinst.compendia = JSON.parse(this.response);
	}
};

/* 2. Open connection */
xhttp.open("GET", "/compendium/options", true);

/* 3. Send request */
xhttp.send();
