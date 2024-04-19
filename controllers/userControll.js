import User from "../models/userModels.js";
import bcrypt from 'bcryptjs'
import {genrateToken} from "../utils/createToken.js";

const createUser = async(req,res)=>{
  const {username,email,password}=req.body

  const salt =await bcrypt.genSalt(10)
  const hassPassword = await bcrypt.hash(password , salt)
  const newUser = new User({username,email,password:hassPassword})

  try {
   await newUser.save()

   const cookie = genrateToken(newUser._id)

   res.status(201).cookie('user',cookie).json({
    _id:newUser._id,
    username:newUser.username,
    email:newUser.email,
    isAdmin:newUser.isAdmin
   })

  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data")
  }
}

const loginUser = async (req,res)=>{
  const {email,password} = req.body
  
  const existingUser = await User.findOne({email})

  if(existingUser){
    const isPasswordValid = await bcrypt.compare(password,existingUser.password)

    if(isPasswordValid){
      const cookie = genrateToken(existingUser._id)
      
      res.status(201).cookie('user',cookie).json({
        _id:existingUser._id,
        username:existingUser.username,
        email:existingUser.email,
        isAdmin:existingUser.isAdmin
       })  
    }else{
      res.status(404)
      throw new Error("password is invalid")
    }
  }else{
    res.status(404)
    throw new Error("Email is not Registerd")
  }
}

// const logoutCurrentUser =asyncHandler(async (req,res)=>{
//    res.cookie("user",'',{
//     httpOnly:true,
//     expires:new Date(0),
//    })
//    res.status(200).json({message:"logged out successfully"})
// })

// const getAllUser=asyncHandler(async(req,res)=>{
//   const users = await User.find({})
//   res.json(users)
// })
// const getCurrentUserProfile = asyncHandler(async (req,res)=>{
//   const user = await User.findById(req.user._id);
//   if (user) {
//     const {_id,username,email,} =user
//     res.json({_id,username,email})
//   }else{
//      res.status(404)
//      throw new Error("User Not found.")
//   }
// })

// const upadateUserProfile =asyncHandler(async (req,res)=>{
//   const user = await User.findById(req.user._id)
//   if(user){
//     user.username = req.body.username || user.username
//     user.email = req.body.email || user.email
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10)
//       const hassPassword = await bcrypt.hash(req.body.password,salt)
//       user.password = hassPassword
//     }

//     const updated = await user.save()

//     res.json({
//       _id:updated._id,
//       username:updated.username,
//       email:updated.email,
//       isAdmin:updated.isAdmin,
//     })
//   }else{
//     res.status(404)
//     throw new Error("User Not found.")
//   }
// })

// const deleteUserById = asyncHandler(async (req,res)=>{
//   const user = await User.findById(req.params.id)

//   if (user) {
//     if(user.isAdmin){
//       res.status(404)
//       throw new Error("Cannot delete admin user")
//     }
//     await User.deleteOne({_id:user._id})
//     res.json({message:"User Removed"})
//   }else{
//     res.status(404)
//     throw new Error("User Not found.")
//   }
// })

// const getUserByid = asyncHandler(async (req,res)=>{
//   const user = await User.findById(req.params.id).select('-password')
//   if (user) {
//     res.json(user)
//   }else{
//     res.status(404)
//     throw new Error("User Not found.")
//   }
// })

// const upadateUserById = asyncHandler(async (req,res)=>{
//   const user = await User.findById(req.params.id)
//   if(user){
//     user.username = req.body.username || user.username
//     user.email = req.body.email || user.email
//     user.isAdmin = Boolean(req.body.isAdmin)

//     const updated = await user.save()

//     res.json({
//       _id:updated._id,
//       username:updated.username,
//       email:updated.email,
//       isAdmin:updated.isAdmin,
//     })
//   }else{
//     res.status(404)
//     throw new Error("User Not found.")
//   }
// })
export {createUser,
        loginUser,
        // logoutCurrentUser,
        // getAllUser,
        // getCurrentUserProfile,
        // upadateUserProfile,
        // deleteUserById,
        // getUserByid,
        // upadateUserById,
      }