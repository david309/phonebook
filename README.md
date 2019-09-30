## Phonebook App project for FullStackOpen

### api

https://phoneapp-backend.herokuapp.com/api/persons

### main page

https://phoneapp-backend.herokuapp.com

## About

This application was made by me while taking the course _fullstackopen_.com. This is by far the greatest course for web development I have ever taken and would like to thank the creators, _The University of Helsinki and Houston Inc_ for coming up with it - and making it free! Thank you. If you're reading this, please check it out!

### Database

The database connection URI is in environment variables, and I use the dotenv npm package to help with this. _npm install dotenv_, then import dotenv with _require('dotenv').config();_ at the _top_ of the page! the environment variables should be loaded first so they are available to the rest of our application immediately.

Create a '.env' file with
'_MONGODB_URI=connection.string.here_'
to connect to a database, and inclue '_.env_' in your .gitignore file.

Another way to connect is to use
'_MONGODB_URI=connection.string.here npm run script_'
when starting the server, but dotenv is the preferred way as it is much easier.

### Front end build

This repository also contains the production build of the front end, so it might be useful to add it to .gitignore. I have it added because this runs on my heroku account.

### Procfile

The Procfile (no extension) is what command heroku uses to start the application.
