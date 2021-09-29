const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const fileFilter = function(req,file,cb){
    if(file.mimetype === 'image/jpeg'){
        cb(null , true)
    }else{
        cb(new Error('please upload jpeg file') , false)
    }
   
   
}
const storage = multer.diskStorage({
    destination : function ( req , file , cb){
        cb(null , './productImage/')
    },
    filename : function (req,file , cb){
        cb(null , new Date().toDateString() + file.originalname)
    }
});
const upload = multer({
    storage : storage,
    limits : {
        fileSize: 1024*1024*5
    },
    fileFilter : fileFilter,
})


router.get('/', (req, res, next) => {
    //get all products from DB

    
    Product.find().select('_id name price').
        then(doc => {
            const response = {
                doc : doc.map(doc=>{
                    return {
                        name : doc.name,
                        price : doc.price,
                        _id : doc._id,
                        url : {
                            type : 'GET' , 
                            urls : 'localhost:3000/products/' + doc._id
                        }
                    }
                })
            }

            res.status(200).json({
                products : response ,
                })
        }).
        catch(err => {
            res.status(404).json({
                massage: 'err'
            })
        })
});

router.post('/addproduct', upload.single('myfile'),(req, res, next) => {

    console.log(req.file);



    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image : req.file.path
    })
    product.save().
        then(doc => {
            res.status(200).json({
                massage: 'added product',
                product :doc
            })
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            })
        })
})

router.get('/:productID', (req, res, next) => {
    Product.find({ _id: req.params.productID }).
        then(resualt => {
            res.status(200).json({
                product: resualt
            })
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            })
        })
})


router.patch('/:productID' , (req,res,next)=>{
    const newproduct = {
        name : req.body.name , 
        price : req.body.price,
    }
    Product.updateOne({_id : req.params.productID } , {$set : newproduct}).
    then(doc=>{
        res.status(200).json({
            massage : doc
        })
    }).
    catch(err => {
        res.status(404).json({
            massage: err
        })
    })

})

router.delete('/:productID' , (req,res,next)=>{
    Product.deleteOne({_id:req.params.productID}).
    then(doc =>{
        res.status(200).json({
            massage : doc
        })
    }).
    catch(err => {
        res.status(404).json({
            massage: err
        })
    })
})




















module.exports = router;