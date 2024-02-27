const db = require('../connection');

const checkLoginStatus = () => {
  //confirms user is logged in before performing user-gated operations
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
