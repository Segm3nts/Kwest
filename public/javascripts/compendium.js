Vue.createApp({
	data() {
		return {
			journals: [
				{
					id: 4,
					title: "A Scholary Necromancer",
					description: "A necromancer by the Old Al Well is studying the prolonged effects of using necrotic powers on earthen habitat. Unfortunately, more and more of his undead test subjects are breaking out and causing chaos, which of course we need to clean up. Preferably we remove this necromancer from the Well, be it peacefully or not.",
					timestamp: "21122021"
				}
			]
		}
	}
}).mount('#cards')
