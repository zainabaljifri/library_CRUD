const Book = require('../model/booksModel');

//CREATE
const addBook = (req, res)=>{
    Book.create(req.body)
    .then(book=>{
        res.status(200).json(book)
    })
    .catch(err=>{
        res.json(err)
    })
}

//READ
const getAllBooks = (req, res)=>{
    Book.find()
    .then(books=>{
        res.json(books)
    })
    .catch(err=>{
        res.json(err)
    })
}
const getBook = (req, res)=>{
    Book.find({_id:req.params.id})
    .then(books=>{
        res.json(books)
    })
    .catch(err=>{
        res.json(err)
    })
}

//UPDATE
const updateBook = (req, res)=>{
    Book.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })
    .then(updatedBook=>{
        res.json(updatedBook);
    })
    .catch(err=>{
        res.json(err)
    })
}

//DELETE
const deleteBook = (req, res)=>{
    Book.findByIdAndDelete(req.params.id)
    .then(book=>{
        res.json(book)
    })
    .catch(err=>{
        res.json(err)
    })
}
module.exports = { addBook, getBook,getAllBooks, updateBook, deleteBook}
