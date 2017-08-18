/*This is the script for the extension's event page.
*It listens for tab updates, and redirects users to the default page when they try to go to another website.
*It listens for when the active tab is switched, and redirects users to the default page when they switch into a blacklisted active tab
*/

var blocking = false;

// url for default page
var resetProp = {url: "chrome-extension://bjbfclakcmjominiidfompgpdmobeljp/redirect.html"};

function redirect() {
	// applies only to the active tab in the current window
	chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
		// redirects user if they're not on the default screen
		if (blocking) {
			if (tabs[0].url != resetProp.url) {
				chrome.tabs.update(resetProp);
			}
		}
	});
}

// redirects user as soon as a tab updates

chrome.tabs.onUpdated.addListener(function() {
	redirect();
});


// redirects user as soon as they switch tabs
chrome.tabs.onActivated.addListener(function() {
	redirect();
});

//disables the extension and stops blocking
function disable() {
	blocking = false;
	// opens new tab
	chrome.tabs.create({url: "options.html"});
	// clears all alarms
	chrome.alarms.clearAll();
}

// switches blocking when the alarm goes off
chrome.alarms.onAlarm.addListener(function(alarm) {
	if (!blocking) {
		blocking = true;
		// opens new tab
		chrome.tabs.create(resetProp);
	} else {
		disable();
	}
});


//responds to message from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//if popup is checking the status, send back the status of blocking
	if(request.message == "status") {
		if(blocking) {
			sendResponse({message: "true"});
		} else {
			sendResponse({message: "false"});
		}
	} else if(request.message == "disable") {
		disable();
	}
	
});


