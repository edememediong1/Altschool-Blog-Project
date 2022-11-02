const validationMW = async (schema, req, res, next) => {
    const bookPayLoad = req.body

    try {
        await schema.validateAsync(bookPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
};

module.exports = validationMW