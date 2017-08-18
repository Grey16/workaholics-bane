/*This is the script for the options page.
*/

var breakLength = 2;

//sets up the page after it loads
function pageSetup() {
	//sets the date picker to the current date upon page load
	document.getElementById('date').valueAsDate = new Date(); 
	//prevents user from selecting days prior to today
	var today = new Date().toISOString().split('T')[0];
	document.getElementById('date').setAttribute("min", today);
	/*
	//displays last set time and date below the timepicker
	chrome.storage.sync.get(['time', 'date', 'ms'], function(items) {
		//splits date into year, month, day
		var dateArr = items.date.split('-');
		//splits time into hour, minute, millisecond
		var timeArr = items.time.split(':');
		//creates date object and displays the local time
		var local = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1]);
		document.getElementById('settings').textContent = local;
	});
	*/
	
	//assigns the user-selected break length to a global variable
	getBreak(function(value) {
		breakLength = value;
	});
}

//saves the time and date set by the user, and creates an alarm set to go off at that time
function saveTime() {
	var time = document.getElementById('time').value;
	var date = document.getElementById('date').value;
	//check to see user has set both values
	var timeStatus = document.getElementById('timeStatus');
	if(!time || !date) {
		timeStatus.textContent = "Please fill out both the time and date";
		setTimeout(function() {
			timeStatus.textContent = '';
		}, 1000);
		return;
	}
	var dateArr = date.split('-');
	var timeArr = time.split(':');
	var localTime = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1]);
	var ms = localTime.getTime();
	if(ms < Date.now()) {
		timeStatus.textContent = "Please enter a valid time and date";
		setTimeout(function() {
			timeStatus.textContent = '';
		}, 1000);
		return;
	}
	//stores user settings
	chrome.storage.sync.set({
		'time': time,
		'date': date,
		'ms': ms
	});
	//creates alarm based on user settings
	chrome.alarms.create({
		when: ms, 
		periodInMinutes: breakLength
	});
	timeStatus.textContent = "Settings saved";
	setTimeout(function() {
		timeStatus.textContent = '';
	}, 1000);
}

//saves the minutes set by the user, and creates an alarm set to go off at that time
function setMinutes() {
	var minutes = document.getElementById('minutes').value;
	//check to see user has set value
	var minStatus = document.getElementById('minStatus');
	if(!minutes) {
		minStatus.textContent = "Please enter a value";
		setTimeout(function() {
			minStatus.textContent = '';
		}, 1000);
		return;
	}
	//creates alarm
	chrome.alarms.create({
		delayInMinutes: parseInt(minutes), 
		periodInMinutes: breakLength
	});
	minStatus.textContent = "Settings saved";
	setTimeout(function() {
		minStatus.textContent = '';
	}, 1000);
}

//saves the length of the break, in minutes, set by the user
function saveBreak() {
	var length = document.getElementById('length').value;
	//check to see user has set value
	var breakStatus = document.getElementById('breakStatus');
	if(!length) {
		breakStatus.textContent = "Please enter a value";
		setTimeout(function() {
			breakStatus.textContent = '';
		}, 1000);
		return;
	}
	//stores user settings
	chrome.storage.sync.set({
		'breakLength': parseInt(length)
	}, function() {
		breakStatus.textContent = "Settings saved";
		setTimeout(function() {
			breakStatus.textContent = '';
		}, 1000);
	});
}

//gets length of break specified by user
function getBreak(callback) {
	chrome.storage.sync.get(function(items) {
		if(!items.breakLength) {
			callback(2);
		} else {
			callback(items.breakLength);
		}
	});
}

//clears all alarms
function clearAlarms() {
	chrome.alarms.clearAll();
}

//Executes functions at appropriate events
window.addEventListener('load', function() {
	pageSetup();
	document.getElementById('setTime').addEventListener('click', saveTime);
	document.getElementById('setMinutes').addEventListener('click', setMinutes);
	document.getElementById('saveBreak').addEventListener('click', saveBreak);
	document.getElementById('clear').addEventListener('click', clearAlarms);
	
});


