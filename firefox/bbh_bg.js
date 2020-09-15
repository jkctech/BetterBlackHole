// Only listens for the specific call to the goals endpoint.
// After this call is done, we can edit the DOM on the tab, so we send a
// message to the content script.
browser.webRequest.onCompleted.addListener(
	// Callback
	function(info) {
		browser.tabs.sendMessage(info.tabId, {greeting: "bhupdate"});
	},

	// filters
	{
		urls: ["*://profile.intra.42.fr/users/*/goals?*"],
		types: ["xmlhttprequest"]
	},

	// extraInfoSpec
	[]
);