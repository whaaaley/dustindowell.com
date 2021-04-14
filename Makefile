
MAKEFLAGS += --no-print-directory

.EXPORT_ALL_VARIABLES:
.PHONY: all clean start prepare css js html

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: NODE_ENV=production
start: NODE_ENV=development

all: prepare css js html
	gzip --best --keep --no-name public/index.html

clean:
	rm -rf node_modules public && mkdir public
	rm -f package-lock.json

start: prepare css js html
	node server --watch "src" --scss "$(MAKE) css" --js "$(MAKE) js"

prepare:
	rm -rf public && mkdir public
	cp -r src/assets/* public

css:
	stylelint "src/**/*.scss" --color --fix
	node build css src/main.scss > public/main.css

js:
	eslint src/**/*.js --color --fix
	node build js src/app.js > public/app.js

html:
	node build html src/index.js | node > public/index.html
