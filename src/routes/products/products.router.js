const express = require("express");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

const ProductsClass = require("../../services/products/products.service");
const products = new ProductsClass();

router.get("/", async (_req, res, next) => {
    try{
        const data = await products.getAllProducts();
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch {
        next(err)
    }
})

router.post("/", authMiddleware, async (req, res, next) => {
    try{
        const { body } = req;
        if(_.isNil(body)) res.status(400).json({success:false, message: "ERROR (body missing)"})
        Object.assign(body, {
            uuid: uuidv4(),
            timestamp: Date.now()
        });
        const data = await products.createProduct(body);
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})

router.put("/:productUuid", authMiddleware, async (req, res, next) => {
    try{
        const { productUuid } = req.params;
        const { body } = req;
        if(_.isNil(productUuid)) res.status(400).json({success:false, message: "ERROR (product missing)"})
        
        const data = await products.updateProduct(productUuid, body);
        if(!data.success) res.status(500).json(data);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})

router.get("/:productUuid", async (req, res, next) =>{
    try{
        const { productUuid } = req.params;
        if(_.isNil(productUuid)) res.status(400).json({success:false, message: "ERROR (product missing)"});

        const data = await products.getProduct(productUuid);
        if(!data.success) res.status(500).json(data);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})

router.delete("/:productUuid", authMiddleware ,async (req, res, next) =>{
    try{
        const { productUuid } = req.params;
        if(_.isNil(productUuid)) res.status(400).json({success:false, message: "ERROR (product missing)"})

        const data = await products.deleteProduct(productUuid);
        if(!data.success) res.status(500).json(data);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})

module.exports = router;