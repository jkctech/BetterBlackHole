// Listen for message from the background page that actually indicates that
// the API request has been completed on the client side so we can run the code.
browser.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	if (request.greeting == "bhupdate")
	{
		var emote = document.getElementsByClassName("emote-bh")[0];
		var bhdate = emote.getAttribute("data-original-title");
		var bhtitles = document.getElementsByClassName("blackhole-title");

		// Remove hover date
		emote.setAttribute("data-original-title", "");

		// Change titles, message and add the toggle button
		bhtitles[0].firstElementChild.innerText = bhdate;
		bhtitles[1].firstElementChild.innerText += '\n' + "You can do it! ❤️";
		bhtitles[1].firstElementChild.innerHTML += ' - <a href="#" id="bhtoggle">Show</a>';

		// Add eventlistener for show / hide
		document.getElementById("bhtoggle").addEventListener("click", event => {
			switch (event.target.innerText)
			{
				case "Show":
					document.getElementById("bh").style.display = "block";
					event.target.innerText = "Hide";
					break;
				case "Hide":
					document.getElementById("bh").style.display = "none";
					event.target.innerText = "Show";
					break;
			}
		});
	}
});