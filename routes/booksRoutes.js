const express = require("express");
const router = express.Router();

const {getAllBooks, getBook, addBook, updateBook, deleteBook} = require('../controllers/booksControllers')

router.post('/',addBook)
router.get('/', getAllBooks)
router.get('/:id', getBook)
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook) 

module.exports = router
