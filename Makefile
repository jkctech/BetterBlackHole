# **************************************************************************** #
#                                                                              #
#                                                         ::::::::             #
#    Makefile                                           :+:    :+:             #
#                                                      +:+                     #
#    By: JKCTech <admin@jkctech.nl>                   +#+                      #
#                                                    +#+                       #
#    Created: 2020/09/10 15:00:09 by JKCTech       #+#    #+#                  #
#    Updated: 2020/09/14 20:36:35 by JKCTech       ########   odam.nl          #
#                                                                              #
# **************************************************************************** #

CHROMEFILES = chrome/bbh.css \
				chrome/bbh.js \
				chrome/bbh_bg.js \
				chrome/modal.js \
				chrome/quote.js \
				chrome/settings.js \
				chrome/manifest.json \
				chrome/icon_16.png \
				chrome/icon_48.png \
				chrome/icon_128.png

FIREFOXFILES = firefox/bbh.css \
				firefox/bbh.js \
				firefox/modal.js \
				firefox/quote.js \
				firefox/settings.js \
				firefox/manifest.json \
				firefox/icon_16.png \
				firefox/icon_48.png \
				firefox/icon_128.png

all: chrome firefox

chrome:
	@echo "Packing Chrome extension..."
	@zip -j chrome.zip $(CHROMEFILES)
	@echo "Done!"

firefox:
	@echo "Packing Firefox extension..."
	@zip -j firefox.zip $(FIREFOXFILES)
	@echo "Done!"

clean:
	@echo "Deleting packages..."
	@$(RM) chrome.zip firefox.zip
	@echo "Deleted!"

re: clean all

.PHONY: all chrome firefox clean