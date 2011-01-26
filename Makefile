
# Install this using `pip install yuicompressor`
YUICOMPRESSOR=yuicompressor

.PHONY: all

all: string_score.min.js

string_score.min.js: string_score.js
	@echo "Minifying string_score.js into string_score.min.js"
	@$(YUICOMPRESSOR) --type=js string_score.js > string_score.min.js
