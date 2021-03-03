const models = require('../models');

class profileController{
    static inputProfile(req,res,next){
        const {nama, nik, no_hp, jenis_kelamin, tempat_tinggal} = req.body;
        models.Profile.create({nama, nik, no_hp, jenis_kelamin, tempat_tinggal})
        .then(result=>{
            res.status(201).json({success:true, message:"regiser was success", result});
        })
        .catch(next)
    }

    static editProfile(req,res,next){
        const profileId = req.params;
        const updatedUser = {
            nama: req.body.nama, 
            nik: req.body.nik,
            no_hp: req.body.no_hp,
            jenis_kelamin: req.body.jenis_kelamin,
            tempat_tinggal: req.body.tempat_tinggal
        }
        models.Profile.update(updatedUser, {where:{id:profileId}})
        .then(result=>{
            res.status(201).json({success:true, message:"update profile success", updatedUser});
        })
        .catch(next);
    
    }

    static deleteProfile(req,res,next){
        const profileId = req.params;
        const userId = req.userData.userId;
        models.Profile.destroy({where:{id:profileId, userId:userId}})
        .then(result=>{
            res.status(200).json({success:true, message:"Delete profile succesfully", result});

        }).catch(next);
    }

}

module.exports = profileController;