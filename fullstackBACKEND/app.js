import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import database from "./db/db.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

//route - /
//access - public
//desc - to showcase all the books
//param  - none
//method - get
app.get("/", (req, res) => {
  return res.json({ data: database.books });
});

//route - /is/:isbn
//access - public
//desc - to showcase book
// based on its isbn
//param  - isbn no.
//method - get
app.get("/is/:isbn", (req, res) => {
  //using req.params

  const filterByISBN = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if (filterByISBN.length === 0) {
    return res.json({
      error: `No such book with this isbn no. - ${req.params.isbn} found`,
    });
  }
  return res.json({ data: filterByISBN });
});

//route - /c/:category
//access - public
//desc - to showcase book wrt its category
//param  - category
//method - get
app.get("/c/:category", (req, res) => {
  const filterByCategory = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );
  if (filterByCategory.length === 0) {
    return res.json({
      error: `No such book with this category - ${req.params.category} found`,
    });
  }
  return res.json({ data: filterByCategory });
});

//route - /lan/:language
//access - public
//desc - to showcase book wrt its category
//param  - category
//method - get
app.get("/lang/:language", (req, res) => {
  const filterByLang = database.books.filter(
    (book) => book.language === req.params.language
  );
  if (filterByLang.length === 0) {
    return res.json({
      error: `No such book with this language- ${req.params.language} found`,
    });
  }
  return res.json({ data: filterByLang });
});
//route - /author
//access - public
//desc - to showcase authors
//param  - none
//method - get
app.get("/authors", (req, res) => {
    return res.json({authors:database.author});
});

//route - /author/books/:isbn
//access - public
//desc - to showcase author and their book wrt to isbn
//param  - book's isbn
//method - get
app.get("/author/book/:isbn", (req, res) => {
  const filterAuthorsByBookISBN = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );
  if (filterAuthorsByBookISBN.length === 0) {
    return res.json({
      error: `No such book with this isbn no. of this author- ${req.params.isbn} found`,
    });
  }
  return res.json({ authors: filterAuthorsByBookISBN });
});

app.listen(PORT, () => {
  console.log(`Connected on ${PORT}`);
});
