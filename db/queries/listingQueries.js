const db = require('../connection');

const getListingsByUserId = (userId) => {
  //need to grab ALL LISTINGS that the user has created (active and inactive)
  //order the results by active/inactive, then by id desc (will split the array into 2 => active + inactive) So that user can re-activate a listing if they want
  const craftedQuery = `
    SELECT listing_image.image_path, listings.id, title, price_cents, listings.status
    FROM LISTINGS
    JOIN (
      SELECT DISTINCT ON (listing_id) listing_id, image_path
      FROM listing_images
      ORDER BY listing_id
    ) AS listing_image ON listings.id = listing_image.listing_id
    WHERE listings.owner_id = $1
    ORDER BY listings.id DESC
  `;
  //query database
  return db
    .query(craftedQuery, [userId])
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const browseListings = (browseFilterObj) => {
  //craft database query based on search parameters
  const queryCraftingArray = [
    `SELECT first_listing_image.image_path, listings.id, title, price_cents, description
    FROM listings
    JOIN (
      SELECT DISTINCT ON (listing_id) listing_id, image_path
      FROM listing_images
      ORDER BY listing_id
    ) AS first_listing_image ON listings.id = first_listing_image.listing_id`,
    ``, // 1 WHERE
    `ORDER BY id DESC
    LIMIT 12`,
    `` // 3 OFFSET
  ];
  //INSERT LOGIC TO EDIT QUERY-CRAFTING-ARRAY BASED ON BROWSE-FILTER-OBJECT CONTENTS
  const whereCraftingArray = [];
  const queryEscapeArray = [];
  for (const searchParameter in browseFilterObj) {
    //if search parameter is defined determine which search parameter it is
    if (browseFilterObj[searchParameter]) {
      //ensure userSearch is applied to the listings title column and it is a partial string search (ie. non-exact match)
      if (searchParameter === 'userSearch') {
        queryEscapeArray.push(`%${browseFilterObj[searchParameter]}%`);
        whereCraftingArray.push(`title LIKE $${queryEscapeArray.length} OR description LIKE $${queryEscapeArray.length}`);
        continue;
      }
      //ensure currentPage is applied to the id
      if (searchParameter === 'currentPage') {
        queryEscapeArray.push(browseFilterObj[searchParameter]);
        // apply to queryCraftingArray immediately, because it is not part of the where statement
        queryCraftingArray[3] = `OFFSET ($${queryEscapeArray.length} - 1) * 12`;
        continue;
      }
      //ensures priceMin is treated as a number and uses mathematical operator
      if (searchParameter === 'priceCentsMin') {
        queryEscapeArray.push(browseFilterObj[searchParameter]);
        whereCraftingArray.push(`price_cents >= $${queryEscapeArray.length}`);
        continue;
      }
      //ensures priceMin is treated as a number and uses mathematical operator
      if (searchParameter === 'priceCentsMax') {
        queryEscapeArray.push(browseFilterObj[searchParameter]);
        whereCraftingArray.push(`price_cents <= $${queryEscapeArray.length}`);
        continue;
      }
      queryEscapeArray.push(browseFilterObj[searchParameter]);
      whereCraftingArray.push(`${searchParameter} = $${queryEscapeArray.length}`);
    }
  }

  //if WHERE statements were generated, then implant it into the queryCraftingArray. Otherwise, skip it.
  if (whereCraftingArray.length) {
    queryCraftingArray[1] = 'WHERE ' + whereCraftingArray.join(' AND ');
  }
  //consolidate queryCraftingArray into a finalized query string
  const craftedQuery = queryCraftingArray.filter(element => element !== '').join(' ') + ';';

  console.log(craftedQuery);
  //query database and return data to web server
  return db
    .query(craftedQuery, queryEscapeArray)
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

//inserts a new entry in the db's listings tables
const postNewListing = (listingObj) => {
  const insertQuery = `
    INSERT INTO listings (owner_id, title, description, price_cents, category, street_address, city, province, country, postal_code, status) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id;
  `;
  const EscapeArray = [
    listingObj.ownerId,
    listingObj.title,
    listingObj.description,
    listingObj.priceCents,
    listingObj.category,
    listingObj.streetAddress,
    listingObj.city,
    listingObj.province,
    listingObj.country,
    listingObj.postalCode,
    listingObj.status,
  ];

  return db
    .query(insertQuery, EscapeArray)
    .then((result) => {
      return Promise.resolve(result.rows[0].id);
    })
    .catch((err) => {
      console.log(err);
    });
};

//retrieves individual listing
const getListing = (listingId) => {
  return db
    .query(`
      SELECT listing_images.image_path, listings.id, users.email, title, price_cents, description
      FROM listings
      JOIN listing_images ON listings.id = listing_id
      JOIN users ON listings.owner_id = users.id
      WHERE listings.id = $1;
    `, [listingId])
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

//soft deletes listing or activates it (flips boolean status value)
const toggleDeleteListing = (listingId) => {
  //NOT status, flips the boolean value true -> false and false -> true
  const craftedQuery = `
    UPDATE listings
    SET status = NOT status
    WHERE id = $1;
  `;

  return db
    .query(craftedQuery, [listingId])
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getListingsByUserId,
  browseListings,
  getListing,
  postNewListing,
  toggleDeleteListing,
};
