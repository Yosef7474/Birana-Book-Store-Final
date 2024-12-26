const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const adminnSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'admin'],
        default: 'admin',
        required: true
    }
})

adminnSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const adminn = mongoose.model('adminn', adminnSchema);

module.exports = adminn;