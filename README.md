# TDXAPI application was built 

# script to do the oush to git and heroku
./run.sh

# pushing changes to GIT and then to Heroku

git add .

git commit -m "path fix"

git push TDX master:main 

git push heroku master:main

# run heroku locally
heroku local

# delete node_modules and rebuild
npm install