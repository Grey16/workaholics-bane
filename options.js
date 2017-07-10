/*This is the script for the options page.
*/

function setDefaults() {
	document.getElementById('date').valueAsDate = new Date();
}

function setAlarm() {
	//Get value in time and date
	var when = document.getElementById('time').value;
	chrome.storage.sync.set({'time': when}, function() {
		message('Settings saved.')
	});
	//Convert time and date value into seconds after epoch
	
	//Create alarm corresponding to the set time
}

function getTime() {
	chrome.storage.sync.get('time', function(items) {
		document.getElementById('test').innerHTML = items.when.toString();
	});
}
	

