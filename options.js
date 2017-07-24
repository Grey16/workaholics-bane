/*This is the script for the options page.
*/

function setDefaults() {
	//Sets the date picker to the current date upon page load
	document.getElementById('date').valueAsDate = new Date(); 
	//Prevents user from selecting days prior to today
	var today = new Date().toISOString().split('T')[0];
	document.getElementById('date').setAttribute("min", today);
	//Displays last set time and date below the timepicker
	chrome.storage.sync.get(['time', 'date'], function(items) {
		var dateArr = items.date.split('-');
		var timeArr = items.time.split(':');
		var local = new Date(dateArr[0], dateArr[1], dateArr[2], timeArr[0], timeArr[1]);
		var test = Date.UTC(dateArr[0], dateArr[1], dateArr[2], timeArr[0], timeArr[1]);
		document.getElementById('status').textContent = items.time + " " + items.date + " " + local + " " + local.toUTCString() + " " + test + " " + local.getTime();
	});
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
	chrome.storage.sync.set({
		'time': time,
		'date': date
	}, function() {
		document.getElementById('status').textContent = 'Options saved';
		setTimeout(function() {
			document.getElementById('status').textContent = ''
		}, 750);
	});
}

//Executes functions at appropriate events
window.addEventListener('load', setDefaults);
document.getElementById('submit').addEventListener('click', saveTime);


