const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class userController{
    static register (req,res,next){

        models.User.findOne({where:{username:req.body.username}}).then(result=>{
            if(result){
                next({name:'EMAIL ALREADY EXIST'});
            }else{
                bcrypt.genSalt(10, function(err,salt){
                    bcrypt.hash(req.body.password, salt, function(err,hash){
                        const user = {
                            username: req.body.username,
                            password: hash,
                            registerDate: req.body.registerDate,
                        }
                        models.User.create(user).then(result=>{
                            res.status(201).json({success:true, message:"regiser was success", result});
                
                        }).catch(next)
                    });
                });        
            }
        }).catch(next)
    }

    static login(req,res,next){
        models.User.findOne({where:{username:req.body.username}}).then(user=>{
            if(user === null){
                next({name:'LOGIN FAILED'});
            } else{
                bcrypt.compare(req.body.password, user.password, function(err,result){
                    if(result){
                        const token = jwt.sign({username:user.username, userId:user.id},"key", function(err, token){
                            res.status(200).json({success:true, message:"authenthication success", token:token});
                        });
                    } else{
                        next({name:'LOGIN FAILED'});
                    }
                });
            }
        }).catch(next);
    }
    static showUser(req,res,next){
        const userId = req.userData.userId;
        models.User.findByPk(userId).then(result=>{
            if(result){
                res.status(200).json({success:true, message:"success to get profile", result});
            } else{
                next({name:'USER NOT FOUND'});
            }
        }).catch(next)
    }
}

module.exports = userController;