const currentDataVersion = 1;
const defaults = {
	dataVersion: 1, // version of data, needs migration if outdated
	quoteType: "default", // available: "default" (static message), "random" (random motivational), "custom" (custom text), "none" (nothing)
	customQuote: "", // custom text for quoteType = "custom"
    showDate: true, // should show original date
    showToggle: true, // should show day countdown toggle link
	enabled: true, // is plugin enabled
}

function getSettings() {
    let settings = localStorage.getItem("bbh-data");
    settings = settings ? JSON.parse(settings) : {...defaults};
    
    // add migration here if needed, make sure to save immediately

    return settings;
};

function resetSettings() {
    localStorage.setItem("bbh-data", JSON.stringify({...defaults}));
}

function setSettings(settings) {
    localStorage.setItem("bbh-data", JSON.stringify(settings));
}
