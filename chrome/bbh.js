// inserts settings button and modal
function insertSettings() {
	// check if it has already inserted settings
	if (document.body.hasAttribute("data-bbhloaded"))
		return;

	// insert settings button
	const buttonGroup = document.querySelector(".user-primary .profile-name .button-actions");
	const newButton = document.createElement("a");
	newButton.setAttribute("href", "#");
	newButton.innerHTML = `<span id="bbh-settingsbutton" class="icon iconf-setting-gear padding-5 padding-left-10 padding-right-10" data-placement="bottom" data-toggle="tooltip" title="" data-original-title="Blackhole settings"></span>`;
	newButton.addEventListener("click", openModal);
	buttonGroup.appendChild(newButton);

	// insert modal
	document.body.appendChild(makeModal());

	// set attribute so it doesnt reinsert
	document.body.setAttribute("data-bbhloaded", "true");
}

function toggleBlackholeTimer(shouldShow) {
	const blackHoleTimer = document.querySelectorAll("#bh");
	for (let el of blackHoleTimer) {
		el.style.display = shouldShow ? "block" : "none";
	}
}

function resetView(bhContainer, { enabled }) {
	// remove previous modification (re-render from clean slate)
	const bbhElements = bhContainer.querySelectorAll(".bbh-element");
	for (let el of bbhElements) {
		el.parentNode.removeChild(el);
	}

	// hide existing blackhole data, (or make them appear if plugin has been disabled)
	const blackholeElements = bhContainer.children;
	for (let i = 0; i < blackholeElements.length; i++) {
		let el = blackholeElements[i];
		if (i == 0) {
			if (enabled)
				el.querySelector(".blackhole-title").classList.add("hidden");
			else
				el.querySelector(".blackhole-title").classList.remove("hidden");
			continue
		}
		if (enabled)
			el.classList.add("hidden");
		else
			el.classList.remove("hidden");
	}
	toggleBlackholeTimer(!enabled);
}

function toggleBlackhole() {
	const shouldShow = this.getAttribute("data-bbh-hidden") == "true";
	this.setAttribute("data-bbh-hidden", (!shouldShow).toString());
	this.innerHTML = shouldShow ? "Hide" : "Show";
	toggleBlackholeTimer(shouldShow);
}

async function makeBlackholeBox(settings, date, colorStyles) {
	// create bbh element
	const bbhDiv = document.createElement("div");
	bbhDiv.classList = "bbh-element";
	
	// show date
	if (settings.showDate)
		bbhDiv.innerHTML += `<span id="bbh-date" style="${colorStyles}">${date}</span>`;
	
	// divider between date and toggle
	if (settings.showToggle && settings.showDate)
		bbhDiv.innerHTML += " - ";

	// add toggle
	bbhDiv.innerHTML += `<a data-bbh-hidden="true" ${settings.showToggle ? "" : 'class="hidden" '} id="bbh-toggle">Show</a>`;

	// show quote
	if (settings.quoteType != "none") {
		const quote = await getQuote(settings);
		bbhDiv.innerHTML += `<p id="bbh-quote"></p>`;
		bbhDiv.querySelector("#bbh-quote").innerText = quote;
	}

	return bbhDiv;
}

// rerenders all of the blackhole data
// requires browser context to run
async function updateView() {
	// get stored data
	let settings = getSettings();

	// get blackhole container and data
	const bhContainer = document.getElementById("goals_container");
	const bhEmote = bhContainer.querySelector(".emote-bh");
	const bhDate = bhEmote.getAttribute("data-original-title");
	const colorStyles = bhContainer.querySelector(".coalition-span").getAttribute("style");

	// re-render from clean slate
	resetView(bhContainer, settings);

	// insert settings button & modal
	insertSettings();

	// stop rendering here if plugin has been disabled
	if (!settings.enabled)
		return ;

	// insert blackhole box
	bhContainer.appendChild(await makeBlackholeBox(settings, bhDate, colorStyles));
	bhContainer.querySelector("#bbh-toggle").addEventListener("click", toggleBlackhole);
}

// Listen for message from the background page that actually indicates that
// the API request has been completed on the client side so we can run the code.
chrome.runtime.onMessage.addListener((request) => {
	if (request.greeting == "bhupdate")
		updateView();
});
