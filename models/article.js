var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    // _id: {
    //     type: String
    // },
    title: {
        type: String,
        required: false,
        unique: true
    },
    link: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: false
    },
    saved: {
        type: Boolean,
        default: false

    },
    note: [
        {
        type: Schema.Types.ObjectId,
        ref: "Note",
        required: false
        }
    ]
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;