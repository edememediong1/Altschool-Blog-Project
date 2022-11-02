const blogModel = require("../model/model");
const userModel = require("../model/model");


const createPost = async(req, res, next) => {
    const {title, 
            description, 
            tags, 
            body} = req.body
    try {
        const newPost = {
            title,
            description: description || title,
            author: req.user._id,
            tags: tags.split(",") || [tags],
        }
    } catch (error) {
        
    }
}







const getAll = async (req, res, next) => {
    try {
        const blogs = await blogModel.find({state: 'published'}).sort({createAt: 'desc'})
        if (!blogs){
            return res.status(404).json({
                status: false,
                message: "Blog not found"
            })
        }
        return res.status(200).json({
            status: true,
            blogs
        })
    } catch (error) {
        next(error)
    }
}


const getbyId = async (req, res, next) => {
    const postId = req.params.postId
    try {
        const posts = await blogModel.findById({_id: postId})
            .where({state: 'published'})
            .populate('author')
        if(!posts){
            return res.status(404).json({
                status: false,
                message: `Blog with id ${postId} not found`
            })
        }
        posts.read_count += 1;
        await posts.save()
        res.status(200).json({
            status: true,
            posts
        })
    } catch (error) {
        // let statusCode = error.status
        // res.status(statusCode) || 500
        // console.log(error)
        next(error)
    }

}