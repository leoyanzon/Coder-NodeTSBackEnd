const express = require("express");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const CartClass = require("../../services/carts/cart.service");
const carts = new CartClass();

router.get("/", async (_req, res, next) => {
    try{
        const data = await carts.getAllCarts();
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch {
        next(err)
    }
})

router.get("/:cartUuid/productos", async (req, res, next) => {
    try{
        const { cartUuid } = req.params;
        const data = await carts.getCart(cartUuid);
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try{
        const { body } = req;
        if(_.isNil(body)) res.status(400).json({success:false, message: "ERROR (body missing)"})
        const newCart = {
            items: [...body],
            uuid: uuidv4(),
            timestamp: Date.now()
        }
        const data = await carts.createCart(newCart);
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})

router.delete("/:cartUuid", async (req, res, next) =>{
    try{
        const { cartUuid } = req.params;
        if(_.isNil(cartUuid)) res.status(400).json({success:false, message: "ERROR (cart missing)"})

        const data = await carts.deleteCart(cartUuid);
        if(!data.success) res.status(500).json(data);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})

router.delete("/:cartUuid/productos/:productUuid", async (req, res, next) =>{
    try{
        const { cartUuid, productUuid } = req.params;
        if(_.isNil(cartUuid) || _.isNil(productUuid)) res.status(400).json({success:false, message: "ERROR (cart missing)"})

        const data = await carts.deleteProductInCart(cartUuid, productUuid);
        if(!data.success) res.status(500).json(data);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})


module.exports = router;