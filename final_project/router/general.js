const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

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

//using axios to complete all of the tasks above

// list the whole list of books/ async/await
public_users.get("/axios", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000");
    res.json(response.data);
  } catch {
    res.sendStatus(401);
  }
});

// list books based on ISBN/ async/await
public_users.get("/axios/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/isbn/${req.params.isbn}`
    );
    res.json(response.data);
  } catch {
    res.status(500);
  }
});

// list books based on authors/ async/await
public_users.get("/axios/author/:author", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/author/${req.params.author}`
    );
    res.json(response.data);
  } catch {
    res.status(500);
  }
});

// list books based on title/ promises
public_users.get("/axios/title/:title", (req, res) => {
  const response = axios
    .get(`http://localhost:5000/title/${req.params.title}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

// list book review based on isbn/ promises
public_users.get("/axios/review/:isbn", (req, res) => {
  const response = axios
    .get(`http://localhost:5000/review/${req.params.isbn}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

module.exports.general = public_users;
