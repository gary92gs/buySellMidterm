const db = require('../connection');


const browseFavourites = (userId) => {
  return db
  .query(`
    SELECT listings.id 
    AS favourite_listings, listings.title, listings.price_cents, sub_listing_images.image_path 
    AS url
    FROM favourites
    JOIN listings ON listings.id = favourites.listing_id
    JOIN ( 
      SELECT DISTINCT ON (listing_id) listing_id, image_path
        FROM listing_images
        ORDER BY listing_id 
        )
        AS sub_listing_images ON listings.id = sub_listing_images.listing_id
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
