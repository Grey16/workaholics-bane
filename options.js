/*This is the script for the options page.
*/

function setDefaults() {
	document.getElementById('date').valueAsDate = new Date();
}

//Sets the date picker to the current date upon page load
window.addEventListener("load", setDefaults);


