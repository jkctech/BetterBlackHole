# **************************************************************************** #
#                                                                              #
#                                                         ::::::::             #
#    Makefile                                           :+:    :+:             #
#                                                      +:+                     #
#    By: JKCTech <admin@jkctech.nl>                   +#+                      #
#                                                    +#+                       #
#    Created: 2020/09/10 15:00:09 by JKCTech       #+#    #+#                  #
#    Updated: 2020/09/10 18:37:13 by JKCTech       ########   odam.nl          #
#                                                                              #
# **************************************************************************** #

CHROMEFILES = chrome/bbh.css \
				chrome/bbh.js \
				chrome/bbh_bg.js \
				chrome/manifest.json

all: $(NAME)

$(NAME): chrome

chrome:
	@echo "Packing Chrome extension..."
	@zip -j chrome.zip $(CHROMEFILES)
	@echo "Done!"

clean:
	@$(RM) chrome.zip

re: clean all

.PHONY: all chrome clean