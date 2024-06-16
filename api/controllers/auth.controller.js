import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) =>{
   const {username, email, password} = req.body;

   if(!username || !email || !password || username === " " || email === " " || password === " "){
    next(errorHandler(400, 'All feilds are required'))
   }

   const hashedPassword = await bcryptjs.hashSync(password, 10);
   const newUser = new User({username, email, password: hashedPassword});

   
   try {
    await newUser.save();
    res.json("Singup successful")
    
   } catch (error) {
    next(error)
   }
   
}

export const signin = async (req, res, next) =>{
   const {email, password} = req.body;

   if(!email || !password || email === " " || password === " "){
      next(errorHandler(400, 'All fields are required'))
      
   }

   try {
      const validuser = await User.findOne({email});
      if(!validuser){
        return  next(errorHandler(404, 'User not found'))
      }

      const validPassword = bcryptjs.compareSync(password, validuser.password)
      if(!validPassword){
         return next(errorHandler(404, 'Incorrect password'))
      }

      const token = jwt.sign(
         {id: validuser._id, isAdmin:validuser.isAdmin}, "secret_key"
      )
console.log("token", token)
      const {password : pass, ...rest} = validuser._doc
      res.status(200).cookie('access_token', token, {
         httpOnly: true
      }).json(rest)

   } catch (error) {
      next(error)
   }
}

export const google = async (req, res, next) => {
   const { email, name, googlePhotoUrl } = req.body;
   try {
     const user = await User.findOne({ email });
     if (user) {
      const token = jwt.sign(
        {id: validuser._id, isAdmin:validuser.isAdmin}, "secret_key"
     )
       const { password, ...rest } = user._doc;
       res
         .status(200)
         .json(rest);
     } else {
       const generatedPassword =
         Math.random().toString(36).slice(-8) +
         Math.random().toString(36).slice(-8);
       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
       const newUser = new User({
         username:
           name.toLowerCase().split(' ').join('') +
           Math.random().toString(9).slice(-4),
         email,
         password: hashedPassword,
         profilePicture: googlePhotoUrl,
       });
       await newUser.save();
       
       const { password, ...rest } = newUser._doc;
       res
         .status(200)
         .json(rest);
     }
   } catch (error) {
     next(error);
   }
 }; 