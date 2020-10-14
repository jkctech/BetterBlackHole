function openModal() {
	// get settings
	let settings = getSettings();
	
	// put settings in inputs
	const dropdown = document.getElementById("bbh-settings-quote-type");
	document.getElementById("bbh-settings-enabled").checked = settings.enabled;
	document.getElementById("bbh-settings-showdate").checked = settings.showDate;
	document.getElementById("bbh-settings-showtoggle").checked = settings.showToggle;
	document.getElementById("bbh-settings-custom-quote").value = settings.customQuote;
	for (let i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value == settings.quoteType)
            dropdown.selectedIndex = i;
    }

	// show modal
	document.getElementById("bbh-modal").classList.remove("hidden");
}

function saveSettings() {
	// get settings
	let settings = getSettings();
	
	// overwrite settings from inputs
	const dropdown = document.getElementById("bbh-settings-quote-type");
	settings.enabled = document.getElementById("bbh-settings-enabled").checked;
	settings.showDate = document.getElementById("bbh-settings-showdate").checked;
	settings.showToggle = document.getElementById("bbh-settings-showtoggle").checked;
	settings.customQuote = document.getElementById("bbh-settings-custom-quote").value;
	settings.quoteType = dropdown.options[dropdown.selectedIndex].value;
	
	// save settings to storage
	setSettings(settings);

	// rerender
	updateView();
	closeModal();
}

function resetModalSettings() {
	resetSettings();
    openModal();
	updateView();
    closeModal();
}

function closeModal() {
	document.getElementById("bbh-modal").classList.add("hidden");
}

function makeModal() {
    const modal = document.createElement("div");
	modal.classList = "bbh-modal hidden";
	modal.id = "bbh-modal";
	modal.addEventListener("click", function(e) {
		if( e.target !== this) return;
		closeModal();
    });

    // content of modal, you can add more settings here.
	modal.innerHTML = `
		<div class="bbh-modal-content">
			<h1>Better blackhole settings</h1>
			<p class="padding-bottom-20">You're doing great, keep going!</p>
			
			<div class="form-group select optional">
				<label class="control-label select optional" for="bbh-settings-quote-type">What quote do you want?</label>
				<div>
					<select class="form-control select optional" id="bbh-settings-quote-type">
						<option value="default">Default quote</option>
						<option value="random">Randomized quote</option>
						<option value="custom">Custom quote</option>
						<option value="none">Show no quote</option>
					</select>
				</div>
			</div>

			<div class="form-group">
				<label class="control-label string optional" for="bbh-settings-custom-quote">Custom quote</label>
				<div>
					<input class="form-control string optional" type="text" id="bbh-settings-custom-quote">
				</div>
			</div>

			<div class="form-group">
				<div class="checkbox">
					<label class="boolean optional" for="bbh-settings-showtoggle">
					<input class="boolean optional" type="checkbox" id="bbh-settings-showtoggle">Show toggle button</label>
				</div>
				<div class="checkbox">
					<label class="boolean optional" for="bbh-settings-showdate">
					<input class="boolean optional" type="checkbox" id="bbh-settings-showdate">Show date (doesn't show day countdown)</label>
				</div>
				<div class="checkbox">
					<label class="boolean optional" for="bbh-settings-enabled">
					<input class="boolean optional" type="checkbox" id="bbh-settings-enabled">Better blackhole enabled</label>
				</div>
			</div>

			<button class="btn btn-primary" id="bbh-settings-save">Save changes</button>
			<button class="btn btn-secondary" id="bbh-settings-reset">Reset to defaults</button>
		</div>
    `;

    // button events
	modal.querySelector("#bbh-settings-save").addEventListener("click", saveSettings);
    modal.querySelector("#bbh-settings-reset").addEventListener("click", resetModalSettings);
    return modal;
}
