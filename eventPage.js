/*This is the script for the extension's event page.
*It listens for tab updates, and redirects users to the default page when they try to go to another website.
*It listens for when the active tab is switched, and redirects users to the default page when they switch into a blacklisted active tab
*/

// checks if the tab is the active tab in the current window
var queryInfo = {active: true, lastFocusedWindow: true};
// url for default page
var resetProp = {url: "chrome://extensions/"};

/*
function redirect() {
	chrome.tabs.query(queryInfo, function(tabs) {
		// redirects user if they're not on the default screen
		if (tabs[0].url != resetProp.url) {
			chrome.tabs.update(resetProp)
		}
	});
}
*/


// redirects user as soon as a tab updates
chrome.tabs.onUpdated.addListener(function() {
	// applies only to the current tab
	chrome.tabs.query(queryInfo, function(tabs) {
		// redirects user if they're not on the default screen
		if (tabs[0].url != resetProp.url) {
			chrome.tabs.update(resetProp)
		}
	});
});

// redirects user as soon as they switch tabs
chrome.tabs.onActivated.addListener(function() {
	// applies only to the current tab
	chrome.tabs.query(queryInfo, function(tabs) {
		// redirects user if they're not on the default screen
		if (tabs[0].url != resetProp.url) {
			chrome.tabs.update(resetProp)
		}
	});
});




