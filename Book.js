const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  
'title':{type:String, required:true, unique:true},
'author':{type:String, required:true, unique:true},
'rating':Number,
'pages':Number,
'rating':Number
});

module.exports = mongoose.model('books', BookSchema);