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
        required: true
    },
    note: {
        type: String,
        ref: "Note"
    }
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;