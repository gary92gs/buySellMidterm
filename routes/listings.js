const express = require('express');
const router = express.Router();

//library for multimedia data from html forms
const multer = require('multer');
//middleware for encoded multimedia data (similar to express.urlencoded)
const upload = multer({ dest: 'public/ad_images_uploaded' });

const dblistings = require('./../db/queries/listingQueries');
const dbImages = require('./../db/queries/listingImagesQueries');

//BROWSE/RETRIEVE MANY LISTINGS BASED ON USER-SPECIFIED SEARCH PARAMETERS
router.get('/', (req, res) => {
  console.log('req.cookies', req.cookies);
  //grab search parameters from cookies (will be passed into browseListings query)
  const filterObj = {
    priceCentsMin: Number(req.cookies.priceMin + '00'),
    priceCentsMax: Number(req.cookies.priceMax + '00'),
    category: req.cookies.category,
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
    currentPage: req.cookies.currentPage || 1,
  };

  const showSearchFilters = true;

  console.log('filterObj', filterObj);
  //query the database and render page based on query-results
  dblistings
    .browseListings(filterObj)
    .then((listings) => {
      return res.render('index', { listings, filterObj, showSearchFilters });
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
    priceMin: req.cookies.priceMin,
    priceMax: req.cookies.priceMax,
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
  };

  const showSearchFilters = true;

  res.render('listings_new', { filterObj, showSearchFilters });
});

router.get('/myListings', (req, res) => {
  //check if user is logged in (only logged-in/registered users can post ads)
  if (!req.cookies.userId) {
    return res.send('You must be logged in to post ads');
  }
  //necessary for banner (it references cookies)
  const filterObj = {
    priceCentsMin: Number(req.cookies.priceMin + '00'),
    priceCentsMax: Number(req.cookies.priceMax + '00'),
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
  };
  //retrieve userId from cookie
  const userId = req.cookies.userId;
  const showSearchFilters = true;

  return dblistings
    .getListingsByUserId(userId)
    .then((usersListingsArray) => {
      const usersActiveListings = usersListingsArray.filter(listing => listing.status); //returns listings with active status?? (need to test)
      const usersInactiveListings = usersListingsArray.filter(listing => !listing.status); //returns listings with inactive status?? (nned to test)
      res.render('listings_user', { usersActiveListings, usersInactiveListings, filterObj, showSearchFilters });
    })
    .catch((err) => {
      console.log(err);
    });
});


//RETRIEVE INDIVIDUAL LISTING
router.get('/:id', (req, res) => {
  //necessary for banner (it references cookies)
  const filterObj = {
    priceCentsMin: Number(req.cookies.priceMin + '00'),
    priceCentsMax: Number(req.cookies.priceMax + '00'),
    userSearch: req.cookies.userSearch,
    city: req.cookies.city,
    province: req.cookies.province,
    country: req.cookies.country,
  };

  const showSearchFilters = true;
  //grab id of individual listing that user clicked
  const requestedId = parseInt(req.params.id);
  //query the database for info regarding the user-selected listing
  return dblistings
    .getListing(requestedId)
    .then((listingArray) => {
      res.render('listings_show', { listingArray, filterObj, showSearchFilters });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete('/:id', (req, res) => {
  //check if user is logged in (only logged-in/registered users can post ads)
  if (!req.cookies.userId) {
    return res.send('You must be logged in to delete ads');
  }
  //grab listings.id to pass into delete query
  const listingId = req.params.id;
  //query the database to update listing status (toggle status to delete/repost listing)
  return dblistings
    .toggleDeleteListing(listingId)
    .then(() => {
      return res.status(200).send("You're Listings Have Been Updated");
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
      //if user did not provide an image, put 'no-image' image into imageArray before trying to insert into listing_images table
      if (!imagePathsArray.length) {
        imagePathsArray.push('/website_images/no-image.png');
      }
      //posts user-provided new images into listing_images table
      return dbImages.postListingImages(newListingId, imagePathsArray);
    })
    .then(() => {
      return res.redirect('/listings');
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
