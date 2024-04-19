import User from "../models/userModels.js";
import { validateToken } from "../utils/createToken.js";
import asyncHandler from "./asynHandler.js";

const authenticate = asyncHandler(async (req,res,next)=>{
   let token
   token=await req.cookies.user
  if (token) {
    try {
        const decoded = validateToken(token)
        req.user = await User.findById(decoded.userId).select("-password")
        next()
    } catch (error) {
        res.status(401)
        throw new Error("Not authorized , token failed.")
    }
  }else{
    res.status(401)
    throw new Error("Login first")
  }
})


const authorizeAdim = async(req,res,next)=>{
    if(req.user && req.user.isAdmin ){
        next()
    }else{
        res.status(401).send("Not authorized as an admin")
    }
}
export {authenticate,authorizeAdim}