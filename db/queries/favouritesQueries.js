const db = require('../connection');

const browseFavourites = (userId) => {
  return db
  .query(`
    SELECT listings.id, 
    listings.title, listings.price_cents, sub_listing_images.image_path 
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
    return Promise.resolve(result.rows);
  })
  .catch((err) => {
    console.log(err);
  });
};

const addFavourite = (userId, listingId) => {
  if (!listingId) {
    return Promise.reject(new Error('Invalid listing ID'));
  }

  // Check if the listing is already in the user's favorites
  return db
    .query(`
      SELECT COUNT(*) AS count
      FROM favourites
      WHERE user_id = $1 AND listing_id = $2
    `, [userId, listingId])
    .then((result) => {
      const { count } = result.rows[0];
      if (count > 0) {
        return Promise.reject(new Error('Listing already in favorites'));
      }

      // If the listing is not already a favorite, add it to the favorites list
      return db.query(`
        INSERT INTO favourites (user_id, listing_id) VALUES ($1, $2)
      `, [userId, listingId]);
    })
    .then((result) => {
      console.log('Favourite added successfully', result);
    })
    .catch((error) => {
      console.error('Error adding favourite:', error);
      return Promise.reject(error);
    });
};

const removeFavourite = (listingId) => {
  return db
    .query(`
      DELETE 
      FROM favourites 
      WHERE listing_id = $1
    `, [listingId])
    .then(result => {
      if (result.rowCount > 0) {
        return Promise.resolve(result.rowCount); 
      }
      return Promise.reject(new Error('Listing not found in favourites' + listingId));
    })
    .catch(error => {
      return Promise.reject(error); 
    });
};

module.exports = { 
  browseFavourites,
  removeFavourite,
  addFavourite,
 }
