var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../models/User');
const Order = require('../models/Order');

router.post('/signup', (req, res, next) => {


  User.find({ username: req.body.username }).
    then(resualt => {
      if (resualt.length < 1) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(404).json({
              massage: err
            })
          } else {
            const user = new User({
              username: req.body.username,
              password: hash
            })
            user.save().
              then(resualt => {
                console.log(resualt);
                res.status(200).json({
                  massage: 'user already created'
                })
              }).
              catch(err => {
                res.status(404).json({
                  massage: err.massage
                })
              })
          }

        })

      } else {
        res.status(404).json({
          massage: 'this user already created'
        })
      }

    }).catch(err => {
      res.status(404).json({
        massage: err
      })
    })
})

router.get('/signin', (req, res, next) => {
  User.find({ username: req.body.username }).
    then(user => {
      if (user.length >= 1) {
        bcrypt.compare(req.body.password, user[0].password).
          then(resualt => {
            if (resualt) {
              res.status(200).json({
                massage: 'success signin'
              })
            } else {
              res.status(404).json({
                massage: 'wrong password'
              })
            }
          }).
          catch(err => {
            res.status(404).json({
              massage: err
            })
          })

      } else {
        res.status(404).json({
          massage: 'wrong user name'
        })
      }
    }).
    catch(err => {
      res.status(404).json({
        massage: err
      })
    })
})

router.patch('/updateuser/:id' , (req,res,next)=>{

  bcrypt.hash(req.body.password , 10).
  then(hash=>{
    const newUser = {
      username : req.body.username,
      password : hash ,
    }
   
    User.findOneAndUpdate({_id : req.params.id} , {$set : newUser}).
    then(resualt =>{
      if(resualt){
        res.status(202).json({
          massage:'user already update'
        })
      }else{
        res.status(404).json({
          massage : 'user not found'
        })
      }
     
    })
  }).
  catch(err => {
    res.status(404).json({
      massage: err
    })
  })
 
})



router.delete('/deleteuser/:id', (req , res , next)=>{
  User.findOneAndDelete({_id : req.params.id}).
  then(resualt =>{
    if(resualt){
      res.status(200).json({
        massage : 'user deleted'
      })
      
    } 
  }).
  catch(err => {
    res.status(404).json({
      massage: err
    })
  })
})


router.delete('/:orderID', (req,res , next)=>{
  Order.deleteOne({_id : req.params.orderID}).
    then(doc=>{
      res.status(200).json({
        massage : "order deleted"
      })
    }).
    catch(err => {
      res.status(404).json({
        massage: err
      })
    })
    
})




module.exports = router;
