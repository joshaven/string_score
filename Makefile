
# Install this using `pip install squeeze`
SQUEEZE=squeeze
UGLIFYJS=uglifyjs

.PHONY: all clean

all: string_score.min.js string_score.uglify.js

string_score.min.js: string_score.js
	@echo "Minifying (YUICompressor) string_score.js into string_score.min.js"
	@$(SQUEEZE) yuicompressor --type=js string_score.js > string_score.min.js

string_score.uglify.js: string_score.js
	@echo "Minifying (UglifyJS) string_score.js into string_score.uglify.js"
	@$(UGLIFYJS) -nc string_score.js > string_score.uglify.js

clean:
	@-rm -rf string_score.*.js
