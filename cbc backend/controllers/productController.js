import Product from "../models/product.js";

export function getProduct(req,res){
    Product.find().then((productList) => { 
        res.json({
            list: productList
        });
   }).catch(
        (error)=>{
            res.json({
                message:error
            });
        }
   )
}
export function createProduct(req,res){
    console.log(req.user);

    if(req.user == null){
        res.json({
            message : "You are not logged in"
        })
        return        
    }

    if(req.user.type != "admin"){
        res.json({
            message: "You are not an admin"
        })
        return
    }

    const product = new Product(req.body)
    product.save().then (()=>{
     res.json({
         message: "Product is created."
    });
    }).catch(()=>{
     res.json({
         message: "Product is not created"
        });
    })
}

export function deleteProduct(req,res){
    Product.deleteOne({name : req.body.name}).then(
        ()=>{
             res.json(
            {
                message : "Product deleted sucessfully"
            }
            )
            }
    ).catch(()=>{
            res.json({
                message: "Product is not deleted"
            });
        }
    )
}

export function getProductByName(req,res){
    const name = req.params.name;

    Product.find({name : name}).then((productList) => { 
        res.json({
            list: productList
        });
   }).catch(
        (error)=>{
            res.json({
                message:error
            });
        }
   )
}