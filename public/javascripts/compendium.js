// Create the Vue instance
let vueinst = Vue.createApp({
	data: function() {
		return {
			showCompendium: true,
			showJournal: false,
			journals: [
				/*{
					j_id: 4,
					title: "A Scholary Necromancer",
					description: "A necromancer by the Old Al Well is studying the prolonged effects of using necrotic powers on earthen habitat. Unfortunately, more and more of his undead test subjects are breaking out and causing chaos, which of course we need to clean up.",
					timestamp: "21122021",
					style: "fa-book"
				}*/
			],
			focus: {
				
			},
			entries: [
				/*{
					timestamp: "sometime",
					content: "After asking the necromancer what was going on, he explained that the reason for his necromancy was to destroy a great beast. We reasoned with him that if we went and slew the beast, bringing back its head, that he would stop with his 'experiment'."
				}*/
			],
			icons: [
				
			]
		}
	},
	methods: {
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
			var seconds = parseInt(timestamp[17] + timestamp[18]);
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
			// Suffix
			if (hours < 12) {
				var suffix = "am";
			} else {
				var suffix = "pm";
				hours -= 12;
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
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			return hours + ":" + minutes + ":" + seconds + suffix + ", " + day + " " + month + " " + year
		}
	}
}).mount('#mount');

function showJournals() {
	if (vueinst.showCompendium) {
		vueinst.showCompendium = false;
	} else {
		vueinst.showCompendium = true;
	}
}

function getJournals() {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    vueinst.journals = JSON.parse(this.response);
		}
	};
	/* 2. Open connection */
	xhttp.open("GET", "/journal/get", true);
	/* 3. Send request */
	xhttp.send();
}

function getEntries(j_id) {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    for (let i = 0; i < vueinst.journals.length; i++) {
		    	if (vueinst.journals[i].j_id == j_id) {
		    		vueinst.showJournal = true;
		    		vueinst.focus = vueinst.journals[i];
		    		break;
		    	}
		    }
		    vueinst.entries = JSON.parse(this.response);
		}
	};
	/* 2. Open connection */
	xhttp.open("GET", "/journal/fetch/" + j_id, true);
	/* 3. Send request */
	xhttp.send();
}

function getIcons() {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    vueinst.icons = JSON.parse(this.response);
		}
	};
	/* 2. Open connection */
	xhttp.open("GET", "/journal/icons", true);
	/* 3. Send request */
	xhttp.send();
}

function newJournal() {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    getJournals();
		}
	};
	/* 2. Open connection */
	xhttp.open("GET", "/journal/new", true);
	/* 3. Send request */
	xhttp.send();
}

function newEntry(j_id) {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    getEntries(j_id);
		}
	};
	/* 2. Open connection */
	xhttp.open("GET", "/entry/new/" + j_id, true);
	/* 3. Send request */
	xhttp.send();
}

function saveTitleDescriptionIcon() {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		}
	};
	/* 2. Open connection */
	xhttp.open("POST", "/journal/save", true);
	/* 3. Send request */
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(vueinst.focus));
}

function saveEntry(e_id) {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 2. Open connection */
	xhttp.open("POST", "/entry/save", true);
	// First get the right index
	for (var i = 0; i < vueinst.entries.length; i++) {
		if (vueinst.entries[i].e_id == e_id) {
			break;
		}
	}
	/* 3. Send request */
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(vueinst.entries[i]));
}

function deleteJournal(j_id) {
	if (confirm("Are you sure you want to delete this journal?")) {
		if (confirm("You will lose all entries within this journal. Are you sure?")) {
			/* 1. Create new AJAX request */
			var xhttp = new XMLHttpRequest();
			/* 4. Handle response (callback function) */
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					getJournals();
				}
			};
			/* 2. Open connection */
			xhttp.open("GET", "/journal/delete/" + j_id, true);
			/* 3. Send request */
			xhttp.send();
		}
	}
}

function deleteEntry(e_id) {
	if (confirm("Are you sure you want to delete this entry?")) {
		/* 1. Create new AJAX request */
		var xhttp = new XMLHttpRequest();
		/* 4. Handle response (callback function) */
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				for (let i = 0; i < vueinst.entries.length; i++) {
					if (vueinst.entries[i].e_id == e_id) {
						vueinst.entries.splice(i, 1);
					}
				}
			}
		};
		/* 2. Open connection */
		xhttp.open("GET", "/entry/delete/" + e_id, true);
		/* 3. Send request */
		xhttp.send();
	}
}

getJournals();
getIcons();
