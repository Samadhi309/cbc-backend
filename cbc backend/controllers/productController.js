import product from "../models/ products.js";


export function createProduct(req,res){

    if(!isAdmin(req)){
        res.json({
            message: "Please login as administrator to create products"
        })
        return
    }
    
    const newProductData = req.body

    const product = new Product(newProductData)

    product.save().then(()=>(
        res.json({
            message: "Product created"
        })
    )).catch((error)=>(
        res.json({
            message: "Product not created"
        })
    ))
}
export function getProduct(req,res){
    Product.find({}).then((products)=>{
        res.json(products)
    })
}