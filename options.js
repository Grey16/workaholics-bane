/*This is the script for the options page.
*/

//sets up the page after it loads
function pageSetup() {
	//sets the date picker to the current date upon page load
	document.getElementById('date').valueAsDate = new Date(); 
	//prevents user from selecting days prior to today
	var today = new Date().toISOString().split('T')[0];
	document.getElementById('date').setAttribute("min", today);
	//displays last set time and date below the timepicker
	chrome.storage.sync.get(['time', 'date', 'ms'], function(items) {
		//splits date into year, month, day
		var dateArr = items.date.split('-');
		//splits time into hour, minute, millisecond
		var timeArr = items.time.split(':');
		//creates date object and displays the local time
		var local = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1]);
		document.getElementById('status').textContent = local;
	});
	/*
	//displays alarms
	chrome.alarms.get(function(alarm) {
		document.getElementById('check').textContent = alarm.when;
	});
	*/
}

//saves the time and date set by the user
function saveTime() {
	var time = document.getElementById('time').value;
	var date = document.getElementById('date').value;
	//check to see user has set both values
	if (!time || !date) {
		return;
	}
	//stores user settings
	var dateArr = date.split('-');
	var timeArr = time.split(':');
	var localTime = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1]);
	var ms = localTime.getTime();
	chrome.storage.sync.set({
		'time': time,
		'date': date,
		'ms': ms
	});
	//creates alarm based on user settings
	chrome.alarms.create({'when': ms, 'periodInMinutes': 2});
}

//clears all alarms
function clearAlarms() {
	chrome.alarms.clearAll();
}

//Executes functions at appropriate events
window.addEventListener('load', function() {
	pageSetup();
	document.getElementById('submit').addEventListener('click', saveTime);
	document.getElementById('clear').addEventListener('click', clearAlarms);
});


