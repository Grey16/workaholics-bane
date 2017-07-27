/*This is the script for the options page.
*/

function setDefaults() {
	// sets the date picker to the current date upon page load
	document.getElementById('date').valueAsDate = new Date(); 
	// prevents user from selecting days prior to today
	var today = new Date().toISOString().split('T')[0];
	document.getElementById('date').setAttribute("min", today);
	// displays last set time and date below the timepicker
	chrome.storage.sync.get(['time', 'date', 'ms'], function(items) {
		// splits date into year, month, day
		var dateArr = items.date.split('-');
		// splits time into hour, minute, millisecond
		var timeArr = items.time.split(':');
		var local = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1]);
		// displays the local time and milliseconds since epoch
		document.getElementById('status').textContent = local + " " + items.ms;
	});
	console.log('testing');
	// displays alarms
	/*
	chrome.alarms.get(function(alarms) {
		document.getElementById('check').textContent = alarms[0].scheduledTime;
	});
	*/
}

//Saves the time and date set by the user
function saveTime() {
	var time = document.getElementById('time').value;
	var date = document.getElementById('date').value;
	//Check to see user has set both values
	if (!time || !date) {
		return;
	}
	//Stores user settings
	var dateArr = date.split('-');
	var timeArr = time.split(':');
	var localTime = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1]);
	var ms = localTime.getTime();
	chrome.storage.sync.set({
		'time': time,
		'date': date,
		'ms': ms
	}, function() {
		document.getElementById('status').textContent = 'Options saved';
		setTimeout(function() {
			document.getElementById('status').textContent = ''
		}, 750);
	});
	//Creates alarm based on user settings
	chrome.alarms.create("myAlarm", {'when': ms});
}

//Executes functions at appropriate events
window.addEventListener('load', setDefaults);
document.getElementById('submit').addEventListener('click', saveTime);


