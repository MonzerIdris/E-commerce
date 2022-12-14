const express = require('express')
const app = express()
const moongose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productsRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require("./routes/stripe")
const cors = require("cors")
var morgan = require('morgan');
const { verifyToken } = require('./routes/verifyToken')
const isAuthorized = require('./mw/isAuthirized')
const authorize = require('./mw/authorize')
const Cart = require('./models/Cart')
const path = require("path")



dotenv.config()

// const jsonParser = bodyParser.json()
app.use(express.static(path.join(__dirname, "my-app", "build")))
app.use("/itemsImages", express.static(path.join(__dirname, "itemsImages")));
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));  
app.use(morgan('dev'))


moongose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connencted'))
.catch((err) => console.log(err.message) )


// ... other app.use middleware 
// app.use(isAuthorized)
app.use("/api/auth", authRoute)
app.use("/api/users",  userRoute)
app.use("/api/products", productsRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)
app.get("/api/validate-token", isAuthorized, async (req, res) => {
  if (req.user) {
    req.user.password = undefined
  
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: req.tokenStatus || "invalid" });
  }
})
// ...
// Right before your app.listen(), add this:
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "my-app", "build", "index.html"));
});
try {
    app.listen(process.env.PORT || 5000, () => console.log("Backend server is running"))
} catch (err) {
    console.log(err.message)
}

