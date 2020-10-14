const defaultQuote = "You can do it! ❤️";

const randomQuotes = [
    "quote one",
    "quote two"
]

async function getQuote({ quoteType, customQuote }) {
	if (quoteType == "default")
		return defaultQuote;

	if (quoteType == "custom")
		return customQuote.length > 0 ? customQuote : "No quote found";
	
	return randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
}