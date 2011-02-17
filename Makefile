
# Install this using `pip install squeeze`
SQUEEZE=squeeze
# Install this using `npm install uglify-js@latest` or using the instructions at the uglifyjs repo.
UGLIFYJS=uglifyjs

.PHONY: all clean

all: string_score.min.js string_score.uglify.js score.js score.uglify.js

string_score.min.js: string_score.js
	@echo "Minifying (YUICompressor) string_score.js into string_score.min.js"
	@$(SQUEEZE) yuicompressor --type=js string_score.js > string_score.min.js

string_score.uglify.js: string_score.js
	@echo "Minifying (UglifyJS) string_score.js into string_score.uglify.js"
	@$(UGLIFYJS) -nc string_score.js > string_score.uglify.js

score.js: score.coffee
	coffee -b -c score.coffee

score.uglify.js: score.js
	$(UGLIFYJS) -nc score.js > score.uglify.js

clean:
	@-rm -rf string_score.*.js
	@-rm -rf score*js

