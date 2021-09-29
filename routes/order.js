const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/addorder', (req,res,next)=>{
    const neworder = new Order({
        user :req.body.user,
        product : req.body.product
    })
    neworder.save().
    then(doc=>{
        res.status(200).json({
            massage:doc
        })
    }).
    catch(err=>{
        res.status(404).json({
            massage:err
        })
    })
})


router.get('/' , (req,res,next)=>{

    Order.find().populate('user' , 'username').
    then(doc=>{
        res.status(200).json({
            massage : doc   
        })
    }).
    catch(err =>{
        res.status(404).json({
            massage : err
        })
    })
})


router.patch('/updateOrder/:orderID',(req,res,next)=>{

    var newProduct = req.body.product ; 
   
    Order.find({_id:req.params.orderID}).
    then(doc=>{
        var oldProduct = doc[0].product;
        for(var indexOfnewProduct = 0 ; indexOfnewProduct < newProduct.length ; indexOfnewProduct ++){
            for(var indexOfoldProduct = 0 ; indexOfoldProduct < oldProduct.length ; indexOfoldProduct ++){
                if(newProduct[indexOfnewProduct]._id===oldProduct[indexOfoldProduct]._id){
                    oldProduct[indexOfoldProduct].quantity = Number(oldProduct[indexOfoldProduct].quantity)  + Number(newProduct[indexOfnewProduct].quantity) ;
                    newProduct.splice(indexOfnewProduct , 1) ; 
                    break;
   
                }
   
   
            }
       }
       oldProduct = oldProduct.concat(newProduct);
       console.log(oldProduct );
       const newOlder = {
           product : oldProduct
       }
       
        Order.updateOne({_id : req.params.orderID} , {$set : neworder}).
        then(doc=>{
            res.status(200).json({
                massage : doc
            })
        }).
        catch(err =>{
            res.status(404).json({
                massage : err
            })
        })
        res.status(200).json({
            massage : doc[0].product
        })
    }).
    catch(err =>{
        res.status(404).json({
            massage : err
        })
    })
})





module.exports = router;