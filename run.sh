#!/bin/sh

git add .

git commit -m "path fix"

git push TDX master:main 

git push heroku master:main