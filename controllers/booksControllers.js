const Book = require('../model/booksModel');
const fs = require('fs');
const multiparty = require('multiparty');
var axios = require('axios');

// use 'form-data' format in postman to enter the desired fields,
// 'raw'/'x-www..' and other formats are not supported yet

//CREATE
const addBook = (req, res) => {
    let book = new Object();
    let form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        addFile(files, book);
        Object.entries(fields).forEach(function ([name, value]) {
            book[name] = value.toString();
        });
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
    let book = new Object();
    let form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        addFile(files, book);
        Object.entries(fields).forEach(function ([name, value]) {
            book[name] = value.toString();
        });
        Book.findByIdAndUpdate(req.params.id, book, {
            new: true,
        })
            .then(updatedBook => {
                res.json(updatedBook);
            })
            .catch(err => {
                res.json(err)
            })
    });
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

//UPLOAD FILE 
function addFile(files, book) {
    if (Object.keys(files).length != 0) {
        const oldpath = files.uploads[0].path;
        let file = files.uploads[0].originalFilename;
        file = file.replace(/\s+/g, '-');
        let newFile = fs.readFileSync(oldpath);
        let base64data = newFile.toString('base64');
        uploadFileApi(base64data, file);
        book.uploads = `https://raw.githubusercontent.com/zainabaljifri/uploads/main/uploads/${file}`;
    }
}

//UPLOAD TO A CLOUD STORAGE (i'm storing in a github repo for simplicity)
function uploadFileApi(content, file) {
    let token = "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"
    let data = JSON.stringify({
        "message": "upload file",
        "content": `${content}`
    });
    let config = {
        method: 'put',
        url: `https://api.github.com/repos/zainabaljifri/uploads/contents/uploads/${file}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = { addBook, getBook, getAllBooks, updateBook, deleteBook }
