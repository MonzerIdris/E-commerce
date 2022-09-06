const router = require('express').Router()
const User = require("../models/User");
const CrypyoJS =require("crypto-js")
const jwt  = require('jsonwebtoken');
const Cart = require('../models/Cart');

// REGISTER
router.post("/register", async (req, res) => {
    try {
    console.log(req.body.username)
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: CrypyoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString(),
    })
    console.log(newUser)
    if(newUser){
        const newCart = await Cart.create({
            userId: newUser._id
        })
        const savedUser = await newUser.save()
        const savedCart = await newCart.save()
        return res.status(201).json({user: savedUser, cart: savedCart, message:"User Created Successfully"})
    }
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: "This email is already used"})
    }
}
)

//LOGIN
router.post('/login', async (req,res) =>{
    try {
        // console.log(req.body)
        const user = await User.findOne({
            email: req.body.email
        })
        console.log("1")
        console.log(user)
        if(!user) { return res.status(401).json({message: "Wrong Email"})}
        
        const hashedPassword = CrypyoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
            )
        const ogPassword = hashedPassword.toString(CrypyoJS.enc.Utf8)
        if(ogPassword !== req.body.password) {return res.status(401).json({ message: "wrong password"})}
        
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            }, 
            process.env.JWT_SEC,
            // {expiresIn:"3d"}
        )

        const {password, ...others} = user._doc
        // console.log({...others, accessToken})
        res.status(200).json({...others, accessToken})
    } catch (err) {
        console.log(err.message)
        res.status(500).json({err: err, message: "something is wrong"})
    }
})


module.exports = router;