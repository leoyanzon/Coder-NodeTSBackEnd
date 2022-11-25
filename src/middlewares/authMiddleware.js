const authMiddleware = (_req, res, next) => {
    let administrator = true;
    if (administrator == false) res.status(500).json({
        error: -1,
        descripcion: "No tiene privilegios de administrador"
    })
    console.info("Pasó la auditoria")
    next()
}
module.exports = authMiddleware;