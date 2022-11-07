const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;


const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    }},
    {timestamps: true}
);



// Hashing User password to DB

userSchema.pre('save', async function hashPassword (next) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next()
});

// userSchema.methods.ValidCredential = async function(password) {
//     const user = this;
//     const compare = await bcrypt.compare(password, user.password);

//     return compare;
// };



userSchema.methods.isValidPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}


const userModel = mongoose.model('user', userSchema);
module.exports = userModel
