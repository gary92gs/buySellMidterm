const db = require('../connection');


const browseFavourites = (userId) => {
  //grab all of the listings that a specific user has favourited
};

const addFavourite = (userId, listingId) => {
  //insert new entry into favourites table
}

const removeFavourite = (userId,listingId) => {
  //find favourites entry and delete it (probably easiest to retrieve userID and listingID rather than favouritesId)
}

