const Book = require('../model/booksModel');
const multiparty = require('multiparty');
const { uploadFile, deleteFile } = require("./s3");

// use 'form-data' format in postman to enter the desired fields,
// 'raw'/'x-www..' and other formats are not supported yet

//CREATE
const addBook = (req, res) => {
    let book = new Object();
    let form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
        await addFile(files, book);
        Object.entries(fields).forEach(function ([name, value]) {
            book[name] = value.toString();
        });
        Book.create(book)
            .then(book => {
                res.status(200).json({'message':'book was added successfully','book':book})
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
    let book = new Object();
    let form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
        await addFile(files, book);
        Object.entries(fields).forEach(function ([name, value]) {
            book[name] = value.toString();
        });
        let oldBook = await Book.findOneAndUpdate({_id:req.params.id}, book);
            try{
                deleteFile(oldBook.fileKey)
                res.json({'message':'book was updated successfully'})
            }
            catch{err => {
                res.json(err)
            }}
    });
}

//DELETE
const deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(book => {
            deleteFile(book.fileKey);
            res.json({'message':'book was deleted successfully'})
        })
        .catch(err => {
            res.json(err)
        })
}

//UPLOAD FILE TO CLOUD
async function addFile(files, book) {
    if (Object.keys(files).length != 0) {
        const result = await uploadFile(files.file[0]);
        book.file = result.Location;
        book.fileKey = result.Key;
    }
}

module.exports = { addBook, getBook, getAllBooks, updateBook, deleteBook }
