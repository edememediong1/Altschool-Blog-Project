const Joi = require('joi');

const addBlogSchema = Joi.object({
    title: Joi.string()
        .max(255)
        .trim()
        .required(),
    description: Joi.string()
        .min(10)
        .trim(),
    author: Joi.string(),
    state: Joi.string(),
    tags: Joi.array()
        .items(Joi.string()),
    body: Joi.string()
        .required()         
});

const updateBlogSchema = Joi.object({
    title: Joi.string()
        .max(255)
        .trim(),
    description: Joi.string()
        .min(10)
        .trim(),
    author: Joi.string(),
    state: Joi.string(),
    tags: Joi.array()
        .items(Joi.string()),
    body: Joi.string()       
});


const addUserSchema = Joi.object({
    first_name: Joi.string()
        .max(255)
        .trim()
        .required(),
    last_name: Joi.string()
        .max(255)
        .required()
        .trim(),
    password: Joi.string()
        .min(7)
        .trim()
        .required(),
    email: Joi.string()
        .email()
        .required()         
});


async function addBlogValidationMW (req, res, next) {
    const blogPayLoad = req.body

    try {
        await addBlogSchema.validateAsync(blogPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
};

async function updateBlogValidationMW (req, res, next) {
    const blogPayLoad = req.body

    try {
        await updateBlogSchema.validateAsync(blogPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
};

async function addUserValidationMW (req, res, next) {
    const blogPayLoad = req.body

    try {
        await addUserSchema.validateAsync(blogPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
};

module.exports = {
    addBlogValidationMW,
    updateBlogValidationMW,
    addUserValidationMW
}