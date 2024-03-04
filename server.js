// load .env data into process.env
require('dotenv').config();

//load path for static middleware
const path = require('path');

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
  /* express.static(__dirname + '/styles') */
);
app.use(express.static('public'));
app.use('/db/ad_images', express.static(path.join(__dirname, 'db', 'ad_images')));
app.use(cookieParser());
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// NEW ROUTES
const loginRoutes = require('./routes/login');
const listingsRoutes = require('./routes/listings');
const favouritesRoutes = require('./routes/favourites');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// NEW CONNECTIONS ADDES
app.use('/login', loginRoutes);
app.use('/listings', listingsRoutes);
app.use('/favourites', favouritesRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  //delete all cookies, EXCEPT USER (this clears search parameters and maintains login status)
  for (const cookieName in req.cookies) {
    if (cookieName !== 'user') {
      //sets cookie expiry to date in the past, so it auto deletes
      res.cookie(cookieName, '', { expires: new Date(0)});
    }
  }
  //then redirect to /listings route (default home page)
  res.redirect('/listings');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
