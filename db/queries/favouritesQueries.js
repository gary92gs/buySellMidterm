const db = require('../connection');


const browseFavourites = (userId) => {
  return db
  .query(`
    SELECT listings.id AS favourite_listings
    FROM favourites
    JOIN listings ON listings.id = favourites.listing_id
    WHERE user_id = $1;
  `, [userId])
  .then((result) => {
    console.log('db result:', result.rows);
    return Promise.resolve(result.rows);
  })
  .catch((err) => {
    console.log(err);
  });
};

const addFavourite = (userId, listingId) => {
  //insert new entry into favourites table
}

const removeFavourite = (userId,listingId) => {
  //find favourites entry and delete it (probably easiest to retrieve userID and listingID rather than favouritesId)
}

module.exports = { browseFavourites }
