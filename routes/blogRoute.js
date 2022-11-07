const express = require('express');
const blogController = require("../controller/blogController");
const {addBlogValidationMW,
    updateBlogValidationMW,
} = require('../middleware/validation');
const passport = require('passport')


const postRoute = express.Router()

postRoute.get('/', blogController.getAllPost);

postRoute.get('/:id', blogController.getPostbyId);

postRoute.get('/user/:id', passport.authenticate("jwt", { session: false }), blogController.getUserPosts)

postRoute.post('/create', addBlogValidationMW, passport.authenticate("jwt", { session: false }), blogController.createPost);

postRoute.put('/:id', updateBlogValidationMW, passport.authenticate("jwt", { session: false }), blogController.updatePost);

postRoute.patch('/state/:id', passport.authenticate("jwt", { session: false }), blogController.updateState)

postRoute.delete('/:id', passport.authenticate("jwt", { session: false }), blogController.deletePost);



module.exports = postRoute


    