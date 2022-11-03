const express = require("express");
const { restore } = require("firestore-export-import");
const authMiddleware = require("../../middlewares/authMiddleware")
const errorMiddleware = require("../../middlewares/errorMiddleware")
const _ = require("lodash")

const router = express.Router();

let products = [];

router.get("/", (_req, res) => {
    try{
        res.status(200).json(products);
    }catch(err){
        errorMiddleware(err);
    }
})

router.post("/", authMiddleware, (req, res) => {
    try{
        const { body } = req;
        products.push({ ...body, id: (products.length + 1) || 1 });
        res.redirect("/static")
    }catch(err){
        errorMiddleware(err);
    }
})

router.get("/:id", (req, res) => {
    try{
        const { id } = req.params;
        const selected = products.filter(i => i.id == id)
        if (selected != undefined){
            res.status(200).json({
                success: true,
                data: selected
            })
        } else {
            res.status(404).json({
                success: false,
                error: "producto no encontrado"
            })
        }
    }catch(err){
        errorMiddleware(err);
    }
})

router.put("/:id", authMiddleware, async(req, res) => {
    const { id } = req.params;
    try{
        const existe = products.findIndex(it => it.id == id)
        if (existe != -1){
            const newArray = products.map(it => {
                if (it.id == id) {
                    return ({...req.body})
                }
                return it;
            })
            products = newArray;
            res.redirect("/static");
        } else {
            res.status(404).json({
                success: false,
                error: "producto no encontrado"
            })
        }
    }catch(err){
        errorMiddleware(err);
    }
})

router.delete("/", authMiddleware, async(req, res) => {
    try{
        const { body } = req;
        console.log("deleteando")
        const selected = await products.filter(i => i.id != body.id);
        if (selected != undefined){
            products = selected;
            res.redirect("/static")
        } else {
            res.status(404).json({
                success: false,
                error: "producto no encontrado"
            })
        }
    }catch(err){
        errorMiddleware(err);
    }
})

module.exports = router;