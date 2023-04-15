import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import database from "./db/db.js";
import BookModel from "./db/book.js";
import AuthorModel from "./db/author.js";
import PubModel from "./db/publication.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
  })
  .then(() => console.log("Connection Established"));
//route - /
//access - public
//desc - to showcase all the books
//param  - none
//method - get
app.get("/", async (req, res) => {
  //return res.json({ data: database.books });
  //await for the response
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

//route - /is/:isbn
//access - public
//desc - to showcase book
// based on its isbn
//param  - isbn no.
//method - get
app.get("/is/:isbn", async (req, res) => {
  //using req.params
  const getSpecficBook = await BookModel.findOne({ ISBN: req.params.isbn });

  if (!getSpecficBook) {
    return res.json({
      error: `No such book with this isbn no. - ${req.params.isbn} found`,
    });
  }
  return res.json({ book: getSpecficBook });
});

//route - /c/:category
//access - public
//desc - to showcase book wrt its category
//param  - category
//method - get
app.get("/c/:category", async (req, res) => {
  const getByCategory = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getByCategory) {
    return res.json({
      error: `No such book with this category - ${req.params.category} found`,
    });
  }
  return res.json({ data: getByCategory });
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
app.get("/authors", async (req, res) => {
  const getAuthors = await AuthorModel.find();
  return res.json(getAuthors);
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

//route - /author/books/:isbn
//access - public
//desc - to showcase author and their book wrt to isbn
//param  - book's isbn
//method - get
app.get("/publications", async (req, res) => {
  const getPublications = await PubModel.find();
  return res.json(getPublications);
});

//route - /author/books/:isbn
//access - public
//desc - to showcase author and their book wrt to isbn
//param  - book's isbn
//method - get
app.get("/publication/book/:isbn", (req, res) => {
  const publicationsByBookISBN = database.publication.filter((pub) =>
    pub.books.includes(req.params.isbn)
  );
  if (publicationsByBookISBN.length === 0) {
    return res.json({
      error: `No such book with this isbn no. of this publication- ${req.params.isbn} found`,
    });
  }
  return res.json({ publication: publicationsByBookISBN });
});

//post
//route - /book/new
//desc-  add new book
//access - access to user
//parameter - none
//methods - post
app.post("/book/new", async (req, res) => {
  //get the json body
  const  newBook  = req.body;
  console.log(newBook);
  const addNewBook = await BookModel.create(newBook);
  return res.json({
    books: addNewBook,
    message: "Book was Added!",
  });
});

//route - /author/new
//desc-  add new author
//access - access to admin
//parameter - none
//methods - post
app.post("/author/new", (req, res) => {
  //get the json body
  const  newAuthor  = req.body;
  console.log(newAuthor);
  const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json({
    authors: addNewAuthor,
    message: "Author was added!",
  });
});

//route - /book/update/:isbn
//desc - update book by isbn
//access - public
//param - isbn
//methods - put

//route - /publication/new
//desc-  add new publication
//access - access to admin
//parameter - none
//methods - post
app.post("/publication/new",async (req, res) => {
  //get the json body
  const newPub = req.body;
  console.log(newPub);
  const addNewPub = await PubModel.create(newPub)
  return res.json({
    publications:addNewPub,
    message:"Publication was added"
  })
});

//route - /book/update/:isbn
//desc - update book on isbn
//access - public
//parameter - isbn
//methods put

app.put("/book/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true,//this brings the update to the effect
    }
  );
  return res.json({ books: updatedBook });
});

//route - /book/author/update/:isbn
//desc - update and add new author in book and author respectively
//access - public
//parameter - isbn
//methods - put
app.put("/book/author/update/:isbn",async (req,res)=>{
 //update the book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN:req.params.isbn
    },
    {
      $addToSet: {
        authors:req.body.newAuthor
      }
      /**The 
      $addToSet
       operator adds a value to an array unless the value is already present, in which case 
      $addToSet
       does nothing to that array. */
    },
    {
      new:true
    }
  )
  //update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id:req.body.newAuthor
    },
    {
      $addToSet:{
        books:req.params.isbn
      }
    },
    {
      new:true
    }
  )
  return res.json(
    {
      books:updatedBook,
      author:updatedAuthor,
      message:"New author was added"
    }
  )
})

//route - /book/author/update/:isbn
//desc -update and add new author in book and author respectively
//access - public
//parameter - isbn
//methods - put

//methods - put
app.put("/book/pub/update/:isbn",async (req,res)=>{
  //update the book database
   const updatedBook = await BookModel.findOneAndUpdate(
     {
       ISBN:req.params.isbn
     },
     {
       $addToSet: {
         authors:req.body.newPub
       }
       /**The 
       $addToSet
        operator adds a value to an array unless the value is already present, in which case 
       $addToSet
        does nothing to that array. */
     },
     {
       new:true
     }
   )
   //update the author database
   const updatedPub = await PubModel.findOneAndUpdate(
     {
       id:req.body.newPub
     },
     {
       $addToSet:{
         books:req.params.isbn
       }
     },
     {
       new:true
     }
   )
   return res.json(
     {
       books:updatedBook,
       author:updatedPub,
       message:"New publication was added"
     }
   )
 })

//delete
//route - /book/delete/:isbn
//desc - delete a book
//access - public
//parameter -  isbn
//method -delete
app.delete("book/delete/:isbn",async (req, res) => {
  const deleteAndUpdate = await BookModel.findOneAndDelete(
    {
      ISBN:req.params.isbn
    }
  )
  return res.json({
    books:deleteAndUpdate
  })
});

//route- /book/delete/author/:isbn/:authorId
//desc - remove author from book and vice-versa
//access - public
//parameter - isbn and authorId
//method - delete
app.delete("/book/delete/author/:isbn/:authorId",async (req, res) => {
 const deleteAuthor = await BookModel.findOneAndUpdate(
  {
    ISBN:req.params.isbn
  }
 )
 const deleteBook = await AuthorModel.findOneAndUpdate(
  {
    id:req.params.authorId
  }
 )
  return res.json({
    book: deleteAuthor,
    author: deleteBook,
    message: "Author was deleted!",
  });
});

app.listen(PORT, () => {
  console.log(`Connected on ${PORT}`);
});
