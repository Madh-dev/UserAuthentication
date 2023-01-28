const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


const userSchema = new Schema({
    firstName: {
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
    },
    username: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    }    
},{
    timestamps:{
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})
module.exports = mongoose.model('User', userSchema);

module.exports.hashPassword = async (password)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch(errror){
        throw new Error('Hashing failed', error)
    }
}