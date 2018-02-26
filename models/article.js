var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    // _id: {
    //     type: String
    // },
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    saved: {
        type: Boolean,
        default: false

    },
    note: {
        type: String,
        ref: "Note",
        required: false
    }
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;