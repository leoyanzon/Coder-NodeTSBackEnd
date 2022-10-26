const authMiddleware = (req, res, next) => {
    console.info("Estoy auditando y está ingresando", req.body);
    next()
}

module.exports = authMiddleware;