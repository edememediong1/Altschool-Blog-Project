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

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    state: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    read_count: {
        type:Number,
        default: 0
    },
    reading_time: Number,
    tags: [String],
    body: {
        type: String,
        required: true
    }},
    {timestamps: true}
)




// Hashing User password to DB
;

userSchema.pre('save', async function hashPassword (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next()
});

userSchema.methods.isValidCredential = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};


const userModel = mongoose.model('users', userSchema);
const blogModel = mongoose.model('blogs', blogSchema)

module.exports = {
    userModel,
    blogModel
}