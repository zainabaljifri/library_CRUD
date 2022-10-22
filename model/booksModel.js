const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        id: {
            type: Number
        },
        title: {
            type: String
        }, 
        author: {
            type: String
        }, 
        year_written: {
            type: Number
        }, 
        edition: {
            type: String
        }, 
        price: {
            type: Number,
        }

    }, {
    timestamps: true
}
)

module.exports = mongoose.model('Book', bookSchema)