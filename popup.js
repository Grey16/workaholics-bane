/*Javascript
*/

function setup() {
	//sends message to eventPage to determine if the extension is currently blocking
	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
		var message;
		console.log(response);
		console.log(response.message);
		//display different messages depending on whether the extension is blocking
		if(response.message == "true") {
			message = "until break ends";
		} else if (document.getElementById('alarms').textContent == "Set Break"){
			message = "";
		} else {
			message = "until break";
		}
		document.getElementById('message').textContent = message;
	});
	
	//shows how much time until the alarm goes off
	chrome.alarms.getAll(function(alarms) {
		if(!alarms[0]) {
			document.getElementById('alarms').textContent = "Set Break";
		} else {
			//creates a countdown that updates itself every second
			setInterval(function() {
				var diff = alarms[0].scheduledTime - Date.now();
				var hours = Math.floor(diff / (1000 * 60 * 60));
				var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((diff % (1000 * 60)) / 1000)
				var calc = Math.trunc(diff / 1000);
				calc = Math.trunc(calc / 60);
				var time = minutes.toString() + "m " + seconds.toString() + "s";
				if(hours != 0) {
					time = hours.toString() + "h " + time;
				}
				document.getElementById('alarms').textContent = time;
			}, 1000);
		}
	});
	
	//if the extension is blocking, create a button that will disable the extension
	if(document.getElementById('message').textContent == "until break ends") {
		//creates button and places it under the message
		var disableBtn = document.createElement("button");
		var btnText = document.createTextNode("Disable the extension");
		disableBtn.appendChild(btnText);
		var place = document.getElementById('message');
		place.appendChild(disableBtn);
	}
	
}

window.addEventListener('load', function () {
	setup();
});