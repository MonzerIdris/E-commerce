const router = require('express').Router()
const Product = require('../models/Product')
const upload = require('../multer')

const { verifyToken, authorization, verifyTokenAndAdmin } = require("./verifyToken")

// CREATE
router.post('/', upload, async (req, res) => {
    try {
    console.log(req.body)
    const { title, desc, categories, size, color, price} = req.body
    const { filename: img } = req.file;
    console.log(img)
    const newProduct = new Product({
        title: title,
        desc: desc,
        img: img,
        categories: categories,
        size: size,
        color: color,
        price: price,

    })


        const savedProduct = await newProduct.save()
        res.status(200).json({savedProduct, message: "Product Added TO The Collection"})
    } catch (err) {
        res.status(500).json(err.message)
    }
})

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req,res) => {
    console.log(req.body)
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body,
        },
         { new: true }
        )            
        // console.log(updatedUser)
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        console.log(req.params.id)
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products

        if(qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(2)
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            })
        } else {
            products = await Product.find();
        }

        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;