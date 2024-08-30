const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(401).send("either username or password not provided");
  }

  const user = users.find((user) => user.username === username);

  if (user) {
    return res.status(403).send("User already exists");
  }

  const addedUser = {
    username: req.body.username,
    password: req.body.password,
  };

  users.push(addedUser);

  return res.status(201).json(users);

  return res.status(300).json({ message: "Yet to be implemented" });
});
("");
// Get the book list available in the shop
public_users.get("/", function (req, res) {
  if (books !== null) {
    return res.send(JSON.stringify(books));
  }
  return res.status(300).json({ message: "yet to be implemented" });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.json(book);
  }
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;

  const isFound = [];

  for (let book in books) {
    if (books[book].author === author) {
      isFound.push(book);
    }
  }

  if (isFound) {
    return res.json(books[isFound]);
  }

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;

  const isFound = [];
  for (let book in books) {
    if (books[book].title === title) {
      isFound.push(book);
    }
  }

  if (isFound) {
    return res.json(books[isFound]);
  }
  return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  const book = books[isbn];
  if (book) {
    return res.json({ reviews: book.reviews });
  }

  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
