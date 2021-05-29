const { Cart } = require('../models/cart')

async function addCart(request, response, next) {

    // const bearerToken = request.headers.authorization
    // if (!bearerToken) {
    //       return response.status(401).send("login first")
    // }
    // let token = null;
    // token = bearerToken.split(" ")[1]; 
    // const varifyuser = jwt.verify(token, process.env.JWT_KEY)
    // console.log("LogInUser", varifyuser._id) ; 
    // const LogInUser = await User.find({_id:varifyuser._id})

    const { user_id, product } = request.body

    var productData = await Cart.find({product});

    console.log("product", productData[0]);

    if (productData[0]) {
        console.log("product already in cart");
        response.json({error:"product already in cart"})
    } else {
        const cart = await new Cart(request.body).save();
        console.log("cart", cart);
        response.json({msg:"product added to cart"})
    }
}


const getCart=async(req,res,next)=>{

    var cart = await Cart.find().populate([{
        path:"product"
    }]);

    console.log("cart product", cart);

    res.json({cart})
}

module.exports = { addCart , getCart }