const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        id: {
            type: Number
        },
        title: {
            type: String,
            required: [true, "Please provide a Book Title!"],
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
        },
        file: { type: String },
        fileKey: { type: String },

    }, {
    timestamps: true
}
)

module.exports = mongoose.model('Book', bookSchema)