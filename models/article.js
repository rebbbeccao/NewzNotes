var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    note: {
        type: String,
        ref: "Note",
        required: false
    },
    saved: false
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;