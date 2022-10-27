const Book = require('../model/booksModel');
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');


//CREATE
const addBook = (req, res) => {
    const Path ='https://raw.githubusercontent.com/zainabaljifri/library_CRUD/main/public/uploads/';
    let form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        const oldpath = files.uploads[0].path;
        const file = files.uploads[0].originalFilename;
        const newpath = path.join(__dirname, '../public/uploads') + '/' + file;
        const rawData = fs.readFileSync(oldpath)
            fs.writeFile(newpath, rawData, function (err) {
            if (err) console.log(err)
            console.log("Successfully uploaded");
        });
        let book = new Object();
        Object.entries(fields).forEach(function ([name, value]) {
            book[name]=value.toString();
        });
        book.uploads=newpath;
        Book.create(book)
            .then(book => {
                res.status(200).json(book)
            })
            .catch(err => {
                res.json(err)
            })

    });
}


//READ
const getAllBooks = (req, res) => {
    Book.find()
        .then(books => {
            res.json(books)
        })
        .catch(err => {
            res.json(err)
        })
}
const getBook = (req, res) => {
    Book.find({ _id: req.params.id })
        .then(books => {
            res.json(books)
        })
        .catch(err => {
            res.json(err)
        })
}

//UPDATE
const updateBook = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .then(updatedBook => {
            res.json(updatedBook);
        })
        .catch(err => {
            res.json(err)
        })
}

//DELETE
const deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(book => {
            res.json(book)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports = { addBook, getBook, getAllBooks, updateBook, deleteBook }
