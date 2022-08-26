const router = require('express').Router()

const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { verifyToken, authorization, verifyTokenAndAdmin } = require("./verifyToken")

// CREATE
// router.post('/', verifyToken, async (req, res) => {
//     const newCart = new Cart(req.body)

//     try {
//         const savedCart = await newCart.save()
//         res.status(200).json(savedCart)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// UPDATE
router.put("/:id", async (req,res) => {
    // console.log(req.body)
    let { productId, quantity, action, } = req.body
    // console.log(productId)
    try {
        // const { userId,...others } = req.body
        // const updatedCart = await Cart.findOneAndUpdate(
        //     console.log(others),
        //     req.body.userId,
        //     {
        //     $set: req.body,
        // },
        //  { new: true }
        // )            
        let userCart = await Cart.findOne({userId: req.body.userId})
        
        // console.log(userCart)
        if (! userCart ) return res.status(500).json({message: "You Have To Register First!"})
        else {
            let updated = false
            userCart.products = userCart.products.filter(product => {
                let totalItems = 0
                if(product.productId === productId ){    
                    console.log(product.productId)   
                    if(action === "add"){
                        product.quantity += quantity
                        totalItems = quantity
                    }
                    
                    if(action === "update"){
                        console.log("update")
                        console.log(totalItems,quantity, product.quantity)
                        totalItems = quantity - product.quantity
                        product.quantity = quantity
                        console.log(totalItems, quantity, product.quantity)
                        // totalItems += quantity - product.quantity
                    }
                    updated = true
                    if(action === "delete"){
                        console.log("delete")
                        console.log(product.quantity)
                        userCart.total -= product.quantity
                        console.log(userCart.total)
                        // product.quantity = 0
                        if (userCart.total < 0) userCart = null
                    } else {      
                    // console.log(product)
                    userCart.total += totalItems
                    console.log(totalItems,userCart.total,product)
                    return product
                    }
                }
                else{
                    console.log(product)
                    return product
                }
            })

        if (!updated){
            userCart.products.push({
                productId,
                quantity
            })
            userCart.total += quantity
            const savedCart = await userCart.save()
            res.status(200).json(savedCart)
        
        } else {
            // console.log(userCart)
            // userCart = {
            //     total: totalItems,
            //     userId: req.body.userId,
            //     products: [
            //         {
            //             productId: productId,
            //             quantity: quantity,
            //         },
            //     ],
            // };
            // userCart.total += totalItems
            console.log(userCart.total)
            await userCart.save()
            res.status(200).json(userCart)

        }
        // else if(action == "delete" ){
        //     await userCart.save()
        //     res.status(200).json(userCart)
        // }
        
    }
        // userCart.updateOne()
        // console.log(updatedCart)
        // res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

//DELETE
router.delete("/:id", authorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET THE CART
router.get("/find/:userId", async (req, res) => {
    // console.log(req.params)
    // let product
    try {
        const cart = await Cart.findOne({userId: req.params.userId})
        // if (cart.products.length == 1){
        //     const products = await Product.findById(cart.products[0].productId)
        //     console.log(product)
        //     res.status(200).json({cart , products})

        // }
        // const productsLength = cart.products.length
        // console.log(cart)
        // console.log(req.params.userId)    
        if(!cart){
            return res.status(500).json({message: "something went wrong"})
        }
        if(cart.total < 1){
            return res.status(200).json({cart})
        }
        if (cart.products.length >= 1){
            let productsIds = cart.products.map( p => p.productId)
            const products = await Product.find({_id: { $in: productsIds}})
            // console.log(products)
    
        // console.log()
        res.status(200).json({cart , products})
        
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// GET ALL 
router.get("/", verifyTokenAndAdmin, async (req, res) => {

    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
        
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;