/*This is the script for the options page.
*/

//Sets the date picker to the current date upon page load
function setDefaults() {
	document.getElementById('date').valueAsDate = new Date();
	chrome.storage.sync.get('time', function(items) {
		document.getElementById('status').textContent = items.time;
	});
}

//Saves the time set by the time picker
function saveTime() {
	document.getElementById('status').textContent = 'saving time';
	var time = document.getElementById('time').value;
	chrome.storage.sync.set({
		'time': time
	}, function() {
		document.getElementById('status').textContent = 'Options saved';
		setTimeout(function() {
			document.getElementById('status').textContent = ''
		}, 750);
	});
}

window.addEventListener('load', setDefaults);
document.getElementById('submit').addEventListener('click', saveTime);


