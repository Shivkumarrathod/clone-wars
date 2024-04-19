import jwt from "jsonwebtoken";

const genrateToken = (userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"30d"})
    return token
}
const validateToken=(token)=>{
const payLoad = jwt.verify(token,process.env.JWT_SECRET)
return payLoad
}
export {genrateToken,validateToken}