const errorMiddleware = (err, _req, res, _next) => {
    res.status(500).json({
        success: false,
        error: err.message
    })
}

module.exports = errorMiddleware;