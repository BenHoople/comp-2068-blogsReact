const mongoose = require('mongoose');

const BlogScema = new mongoose.Schema({
    title:{
        type: String,
        required: true //you must have a title!
    },
    content: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISHED'],
        default: 'DRAFT'
    }
},{
    timestamps: true
});

//query helpers
BlogScema.query.drafts = function () {
    return this.where({
        status: 'DRAFT'
    })    
};
BlogScema.query.published = function () {
    return this.where({
        status: 'PUBLISHED'
    })    
};

module.exports = mongoose.model('Blog', BlogScema);