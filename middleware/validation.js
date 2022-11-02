const Joi = require('joi');
const validationMW = require('./validator')

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

const updateUserSchema = Joi.object({
    first_name: Joi.string()
        .max(255)
        .trim(),
    last_name: Joi.string()
        .max(255)
        .trim(),
    password: Joi.string()
        .min(7)
        .trim(),
    email: Joi.string()
        .email()         
});


const addBlogValidationMW = validatorMW(addBlogSchema, req, res, next)

const updateBlogValidationMW = validatorMW(updateBlogSchema, req, res, next)

const addUserValidationMW = validatorMW(addUserSchema, req, res, next)

const updateUserValidationMW = validatorMW(updateUserSchema, req, res, next)


module.exports = {
    addBlogValidationMW,
    updateBlogValidationMW,
    addUserValidationMW,
    updateUserValidationMW
}