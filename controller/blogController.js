const blog = require("../model/post");
const moment = require('moment')
const {readingTime} = require("../utils/helper");



const createPost = async(req, res, next) => {
    const {title, 
            description, 
            tags, 
            body} = req.body
    try {
        const newPost = await blog.create({
            title,
            description: description || title,
            author: req.user._id,
            tags,
            body,
            reading_time: readingTime(body)
        })
        return res.status(201).json({
            status: true,
            newPost
        })
    } catch (error) {
        next(error)
    }
}


const getAllPost = async(req, res, next) => {
    console.log(req.user)
    try {
        const {query} = req;
        const {
            author,
            tags,
            state,
            read_count = 'asc',
            reading_time = 'asc',
            order_by = 'timestamp',
            per_page = 20,
            page =  parseInt(req.query.page)-1 || 0,
            timestamp

        } = query;

        const findQuery = {}

        if (timestamp) {
            findQuery.timestamp = {
                $gt: moment(timestamp).startOf('day').toDate(),
                $lt: moment(timestamp).endOf('day').toDate()
            }
        };

        if (author){
            findQuery.author = author
        }
        if(state) {
            findQuery.state = {$eq: "published"}
        }
        if(tags){
            findQuery.tags = {$in: tags}
        }

        const sortQuery = {};
        const sortAttr = order_by.split(',')

        for(const attr of sortAttr){
            if (read_count === 'asc' && reading_time === 'asc'){
                sortQuery[attr] = 1
            }

            if (read_count === 'desc' && reading_time === 'desc'){
                sortQuery[attr] = -1
            }
        }

        const posts = await blog.find(findQuery)
            .sort(sortQuery)
            .skip(page)
            .limit(per_page)
            .populate('author')


        return res.status(200).json({
            status : true,
            page: page+1,
            posts
        })    

    } catch (error) {
        next(error)
    }
}


const getUserPosts = async (req, res, next) => {
    try {
        const id = req.user._id
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const state = req.query.state || 'published'

        const posts = await blog.find({author: id, state: state})
            .skip(skip)
            .limit(limit)
            .populate('author')

        return res.status(200).json({
            status: true,
            page: page,
            posts
        })
    } catch (error) {
        next(error)
    }
}

const getPostbyId = async (req, res, next) => {
    const id = req.params.id
    try {
        const posts = await blog.findById({_id: id})
            .where({state: 'published'})
            .populate('author')
  
        if(!posts){
            return res.status(404).json({
                status: false,
                message: `Blog Not found`
            })
        }
        posts.read_count += 1;
        await posts.save()
        res.status(200).json({
            status: true,
            posts
        })
    } catch (error) {
        next(error)
    }

}


const updatePost = async(req, res, next) => {
    let body = req.body
    const {id} = req.params;

    try {
        const post = await blog.findByIdAndUpdate(
            id,
            {$set: body},
            {new: true}
        )
        post.updatedAt = new Date()

        return res.status(200).json({
            status: true,
            post: post
        });

    } catch (error) {
        next(error)
    }
}

const updateState = async(req, res, next) => {
    const {id} = req.params;
    const state = req.body.state
    
    try {
        const post = await blog.findById(id)
        if (post.state === 'published') {
            return res.status(400).send('Post has already been published')
        }
        post.state = state;
        post.updatedAt = new Date()
        await post.save()
        return res.status(200).json({
            status: true,
            post
        })
    } catch (error) {
        next(error)
    }
}


const deletePost = async(req, res, next) => {
    const {id} = req.params
    try {
        const post = await blog.findByIdAndDelete(id)
        if(!post) {
            return res.status(404).json({
                status: false,
                msg: "Post with id not found"
            })
        }
        return res.status(200).json({
            status: true,
            msg: null
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPost,
    getAllPost,
    getPostbyId,
    getUserPosts,
    updatePost,
    updateState,
    deletePost
}