const knex = require('knex')(require('./knexfile').development);

// Insert a new user
function createUser(username, profile_picture_url, bio) {
  return knex('users').insert({ username, profile_picture_url, bio });
}

// Fetch user by ID
function getUserById(id) {
  return knex('users').where({ id }).first();
}

// Update a user's info
function updateUser(id, updates) {
  return knex('users').where({ id }).update(updates);
}

module.exports = {
  createUser,
  getUserById,
  updateUser
};