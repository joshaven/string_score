# Install these:
#     pip install squeeze
#     pip install Pygments==dev
# Install nodejs and npm
# Install these:
#     npm install uglify-js@latest  # or use the latest from the github repo.
#     npm install docco
SQUEEZE=squeeze
UGLIFYJS=uglifyjs
DOCCO=docco

.PHONY: all clean docs

all: docs string_score.min.js string_score.uglify.js score.js score.uglify.js

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

docs: score.coffee
	$(DOCCO) score.coffee

clean:
	@-rm -rf string_score.*.js
	@-rm -rf score*js
	@-rm -rf docs/

