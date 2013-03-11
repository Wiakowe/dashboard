#!/bin/sh
java -jar $1 css/default.css -o min/css/wds.min.css

java -jar $1 js/*.js -o min/js/wds.min.js

