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
      const token = jwt.sign({ username }, "access", { expiresIn: "1h" });
      return res.json({ token });
    }
  }
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const authHeader = req.headers["authorization"];
  const { review } = req.query;
  const { isbn } = req.params;

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "access", (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    const username = user.username;
    const book = books[isbn];

    if (book) {
      book.reviews[username] = review;
      return res.status(200).json({ message: "Review updated successfully" });
    } else {
      return res.status(300).json({ message: "Yet to be implemented" });
    }
  });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const token = req.headers["authorization"];
  const { isbn } = req.params;

  // Verify the JWT token
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, "access", (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });

    const username = decoded.username;
    const book = books[isbn];

    if (book) {
      if (book.reviews[username]) {
        // Delete the review by the authenticated user
        delete book.reviews[username];
        return res.json({ message: "Review deleted successfully" });
      } else {
        return res.status(404).json({ message: "Review not found" });
      }
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
