/*This is the script for the options page.
*/

function setDefaults() {
	document.getElementById('date').valueAsDate = new Date();
}

function setAlarm() {
	//Get value in time and date
	var when = document.getElementById('time').value;
	document.getElementById('test').innerHTML = when.toString();
	chrome.storage.sync.set({'time': when}, function() {
		message('Settings saved.')
	});
	//Convert time and date value into seconds after epoch
	
	//Create alarm corresponding to the set time
}

function getTime() {
	chrome.storage.sync.get('time', function(items) {
		document.getElementById('test').innerHTML = items.time.toString();
	});
}

window.addEventListener("load", setDefaults);
var submit = document.getElementById('submit');
submit.addEventListener("click", setAlarm);
var button = document.getElementById('button');
button.addEventListener("click", getTime);
	

