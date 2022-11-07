const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
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
    reading_time: String,
    tags: [String],
    body: {
        type: String,
        required: true
    }},
    {timestamps: true}
)

const blogModel = mongoose.model('blogs', blogSchema);

module.exports = blogModel
