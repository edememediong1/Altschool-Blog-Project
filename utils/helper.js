const CONFIG = require("../config/config");
const jwt = require('jsonwebtoken');

exports.readingTime = (post) => {
    // get number of words in blogpost
    const wordCount = post.split(' ').length
    // get the number of words per minute
    // assuming an average person reads 200 words per minute
    const countPerMinute = wordCount / 200
    const readingTime = Math.ceil(countPerMinute)
    return ` ${readingTime} Minute Read Time`  
}

exports.jwtSignToken = (user) => {
    return jwt.sign(user, CONFIG.JWT_SECRET, { expiresIn: CONFIG.EXPIRE_TIME })
}

