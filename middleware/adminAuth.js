// import jwt from 'jsonwebtoken'
// const adminAuth = async(req,res,next)=>{
//     try {
//         const {token}=req.headers;
//         if(!token){
//             return res.json({success:false,message:'Not Authorized,try again'})
//         }
//         const decode_token = jwt.verify(token.process.env.JWT_SECRET);
//         if(decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//             return res.json({success: false, message:"Not Authorized, try again"})
//         }
//         next();
//     } catch (error) {
//         console.log('Admin Auth Error')
//         res.json({success:false,message:error?.message})
//     }
// };

// export default adminAuth;
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.token;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized, try again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔧 FIX HERE
    const user = await userModel.findById(decoded._id || decoded.id);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.json({ success: false, message: "Admin access required" });
    }

    if (!user.isActive) {
      return res.json({ success: false, message: "Account is deactivated" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
