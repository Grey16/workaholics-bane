/*This is the script for the extension's event page.
*It listens for tab updates, and redirects users to the default page when they try to go to another website.
*It listens for when the active tab is switched, and redirects users to the default page when they switch into a blacklisted active tab
*/

var resetProp = {url: "chrome://extensions/"};
var queryProp = {active: true, lastFocusedWindow: true, status: "complete"};


chrome.tabs.onActivated.addListener(function() {
	chrome.tabs.update(resetProp);
});


chrome.tabs.query(queryProp, function(tabs) {
	chrome.tabs.update(tabs[0].id, resetProp);
});

