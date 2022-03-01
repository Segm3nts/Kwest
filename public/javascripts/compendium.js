// Create the Vue instance
let vueinst = Vue.createApp({
	data: function() {
		return {
			journals: [
				/*{
					j_id: 4,
					title: "A Scholary Necromancer",
					description: "A necromancer by the Old Al Well is studying the prolonged effects of using necrotic powers on earthen habitat. Unfortunately, more and more of his undead test subjects are breaking out and causing chaos, which of course we need to clean up.",
					timestamp: "21122021",
					icon_style: "fa-book"
				}*/
			],
			focus: {
				
			},
			entries: [
				{
					timestamp: "sometime",
					content: "After asking the necromancer what was going on, he explained that the reason for his necromancy was to destroy a great beast. We reasoned with him that if we went and slew the beast, bringing back its head, that he would stop with his 'experiment'."
				}
			]
		}
	}
}).mount('#paned');

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

function journalInfo(j_id) {
	/* 1. Create new AJAX request */
	var xhttp = new XMLHttpRequest();
	/* 4. Handle response (callback function) */
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    for (let i = 0; i < vueinst.journals.length; i++) {
		    	if (vueinst.journals[i].j_id == j_id) {
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

getJournals();
