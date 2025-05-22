
MAKEFLAGS += --no-print-directory

.EXPORT_ALL_VARIABLES:
.PHONY: all clean start prepare css js html

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := $(shell which bash)

all: NODE_ENV=production
start: NODE_ENV=development

all: prepare css js html
	gzip --best --keep --no-name dist/index.html

clean:
	rm -rf node_modules dist && mkdir dist
	rm -f package-lock.json

start: prepare css js html
	node serverOld --watch "src" --scss "$(MAKE) css" --js "$(MAKE) js"

prepare:
	rm -rf dist && mkdir dist
	cp -r src/assets/* dist

css:
	node build css src/main.scss > dist/main.css

js:
	node build js src/app.js > dist/app.js

html:
	node build html src/index.js | node > dist/index.html
