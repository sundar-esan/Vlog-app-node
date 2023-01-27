import mongoose from "mongoose";
import User from "../model/User";
import Vlog from "../model/Vlog";


export const getAllVlogs = async(req,res,next) => {
    let vlogs;
    try{
    vlogs=await Vlog.find().populate("user");
    }
    catch(err){
    return console.log(err)
    }
    if(!vlogs){
        return res.status(400).json({message:"No vlogs Found"})
    }
    return res.status(200).json({vlogs})
    }

 export const addVlog = async(req,res,next) => {

        const{title,description,image,user} = req.body;
        
        let existingUser;
        try{
      existingUser = await User.findById(user)
        }catch(err){
            return console.log(err)
        }
        if(!existingUser){
            return res.status(400).json({message:"Unable To Find User By this Id"})
        }
        const vlog = new Vlog({
            title,
            description,
            image,
            user,
        });
        try{
    const session = await mongoose.startSession();
    session.startTransaction();
     
    await vlog.save({session});

    existingUser.vlogs.push(vlog);

    await existingUser.save({session});
    await session.commitTransaction();
 }  catch (err){
     console.log(err);
      return res.status(500).json({message: err})
        }
        return res.status(200).json({vlog})
    }
    
export const updateVlog = async(req,res,next) => {

        const{title,description}=req.body;

     const vlogId=req.params.id;

     let vlog;

        try{
      vlog = await Vlog.findByIdAndUpdate(vlogId,{
        title,
        description
    })
        } catch(err){
    return console.log(err)
        }
        if(!vlog){
    return res.status(500).json({message:"Unable to Update the Vlog"})
        }return res.status(200).json({vlog})
    }

export const getById = async(req,res,next) => {
    
        const id = req.params.id;
        let vlog;
           try{
       vlog = await Vlog.findById(id)
           }catch(err){
       return console.log(err)
           }
           if(!vlog){
       return res.status(404).json({message:"No Vlog Found"})
           }return res.status(200).json({vlog})
       }

export const deleteVlog = async(req,res,next) => {
    
        const id = req.params.id;

        let vlog;

           try{
            
          console.log(id)
  vlog = await Vlog.findByIdAndRemove(id)
           
          console.log(vlog)
    //    await vlog.user.blogs.pull(vlog);
    //    await vlog.user.save();
           }catch(err){
       return console.log(err)
           }
           if(!vlog){
       return res.status(500).json({message:"Unable to Delete"})
           }return res.status(200).json({message:"Successfully Deleted"})
       }       


     export const getByUserId = async(req,res,next) => {

        const userId=req.params.id;
        let userVlogs;

        try{
        userVlogs = await User.findById(userId).populate("vlogs");
        }
        catch(err){
            return console.log(err);
        }
        if(!userVlogs){
            return res.status(404).json({message:"No Vlog Found"})
        }
        return res.status(200).json({user: userVlogs})
       }