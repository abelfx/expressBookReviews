const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  const user = users.find((user) => user.username === username);

  if (user) {
    return true;
  }
  return false;
};

const authenticatedUser = (username, password) => {
  const user = users.find((user) => user.username === username);
  if (username && user.password === password) {
    return true;
  }
  return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(username)) {
    if (authenticatedUser(username, password)) {
      const token = jwt.sign({ username }, "access", { expiresIn: "30s" });
      return res.json({ token });
    }
  }
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
