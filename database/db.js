const { default: mongoose } = require("mongoose");

async function  connectDb(){
await mongoose.connect('mongodb+srv://uheezal123:uheezal123@node-js-tut.slid6el.mongodb.net/Users?retryWrites=true&w=majority');

}
module.exports = connectDb;