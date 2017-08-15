/*Javascript
*/

function setup() {
	//determines if the extension is currently blocking
	chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
		var message;
		if (tabs[0].url != "chrome://extensions/") {
			message = "until break";
		} else {
			message = "until break ends";
		}
		document.getElementById('message').textContent = message;
	});
	
	//shows how much time until the alarm goes off
	chrome.alarms.getAll(function(alarms) {
		if(!alarms[0]) {
			document.getElementById('alarms').textContent = "No Time";
			document.getElementById('message').textContent = "Set Next Break";
		} else {
			var diff = alarms[0].scheduledTime - Date.now();
			var hours = Math.floor(diff / (1000 * 60 * 60));
			var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((diff % (1000 * 60)) / 1000)
			var calc = Math.trunc(diff / 1000);
			calc = Math.trunc(calc / 60);
			document.getElementById('alarms').textContent = hours.toString() + "h " + minutes.toString() + "m " + seconds.toString() + "s";
		}
	});
	
	chrome.runtime.sendMessage({blocking: "status"}, function(response) {
		var message;
		if(response.message == "true") {
			message = "until break ends";
		} else {
			message = "until break";
		}
		document.getElementById('message').textContent = message;
	})
}

window.addEventListener('load', function () {
	setup();
});