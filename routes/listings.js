const express = require('express');
const router = express.Router();

//library for multimedia data from html forms
const multer = require('multer');
//middleware for encoded multimedia data (similar to express.urlencoded)
const upload = multer({ dest: 'public/ad_images_uploaded' });

const dblistings = require('./../db/queries/listingQueries');
const dbImages = require('./../db/queries/listingImagesQueries');

//RETRIEVE MANY LISTINGS BASED ON USER-SPECIFIED SEARCH PARAMETERS
router.get('/', (req, res) => {
  //grab search parameters from cookies (will be passed into browseListings query)
  const filterObj = {
    category: req.cookies.category,
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
    currentPage: req.cookies.currentPage || 1,
  };
  //query the database and render page based on query-results
  dblistings
    .browseListings(filterObj)
    .then((listings) => {
      return res.render('index', { listings, filterObj });
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET FORM PAGE FOR CREATE NEW LISTING
router.get('/new', (req, res) => {
  //check if user is logged in (only logged-in/registered users can post ads)
  if (!req.cookies.userId) {
    return res.send('You must be logged in to post ads');
  }
  //necessary for banner (it references cookies)
  const filterObj = {
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
  };
  res.render('listings_new', { filterObj });
});

//RETRIEVE INDIVIDUAL LISTING
router.get('/:id', (req, res) => {
  //necessary for banner (it references cookies)
  const filterObj = {
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
  };
  //grab id of individual listing that user clicked
  const requestedId = parseInt(req.params.id);
  //query the database for info regarding the user-selected listing
  dblistings
    .getListing(requestedId)
    .then((listingArray) => {
      res.render('listings_show', { listingArray, filterObj });
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST/CREATE NEW LISTING
router.post('/', upload.array('listingImages'), (req, res) => {
  //check if user is logged in (only logged-in/registered users can post ads)
  if (!req.cookies.userId) {
    return res.send('You must be logged in to post ads');
  }
  //grab listing details required for posting to listings table (to be passed as arguement)
  const listingObj = {
    ownerId: req.cookies.userId,
    title: req.body.title,
    description: req.body.description,
    priceCents: req.body.priceDollars + '00',
    category: req.body.category,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    postalCode: req.body.postalCode,
    status: true,
  };
  //extract image paths into an array for inserting into
  console.log('req.files', req.files);
  const imagePathsArray = req.files.map(file => file.path.slice(6));
  console.log('imagePathsArray', imagePathsArray);
  //query the database to insert into listings, then into
  return dblistings
    .postNewListing(listingObj)
    //newListingId is the brand new listing that was inserted into listings table
    .then((newListingId) => {
      //posts new
      return dbImages.postListingImages(newListingId, imagePathsArray);
    })
    .then(() => {
      return res.redirect('/listings');
    })
    .catch((err) => {
      console.log(err);
    });
});

// * ROUTE TO LISTINGS/:ID *

// router.get('/:id', (req, res) => {
//   const requestedId = parseInt(req.params.id);
//   db.query('SELECT * FROM listings WHERE id = $1', [requestedId])
//     .then((result) => {
//       if (result.rows.length > 0) {
//         const uniqueListing = result.rows[0];
//         return res.render('tbd', { listing: uniqueListing });
//       }
//       console.log('Listing not found');
//       return res.status(404).send("Please try again")
//     })
//     .catch((error) => {
//       console.error('Error fetching listing:', error);
//       return res.status(500).send("Internal Server Error")
//     });
// });

module.exports = router;
