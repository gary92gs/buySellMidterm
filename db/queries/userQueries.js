const db = require('../connection');

//confirms user is logged in before performing user-gated operations
const getUserById = (userId) => {
  return db
    .query(`
      SELECT *
      FROM users
      WHERE id = $1;
    `, [userId])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};


//STRETCH

const updateUser = (userId, updatedFieldsObj) => {
  //find user by id and insert
};

const deleteUser = (userId) => {
  // set user status to False (inactive)
  // set all of the user's listings status to False (inactive)
};

const isValidUserCredentials = (userCredentialsObj) => {
  //check database for user by email or username
  //verify that password is correct
};

const createUser = (userObj) => {
  //using data from registration process
  //verify user email or username has not been used before
  //then insert new user into database
};

module.exports = {
  getUserById,
}
