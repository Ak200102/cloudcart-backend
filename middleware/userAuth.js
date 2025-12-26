// import jwt from "jsonwebtoken";
// import userModel from "../Models/userModel.js";

// const userAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token =
//       authHeader && authHeader.startsWith("Bearer ")
//         ? authHeader.slice(7)
//         : req.headers.token;

//     if (!token) {
//       return res.json({
//         success: false,
//         message: "Not Authorized, login required",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token
    // const user = await userModel.findById(decoded.id);

    // if (!user) {
    //   return res.json({ success: false, message: "User not found" });
    // }

    // if (!user.isActive) {
    //   return res.json({ success: false, message: "Account is deactivated" });
    // }

    // Add user info to request object
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Invalid token" });
//   }
// };

// export default userAuth;
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, login required",
      });
    }
      console.log("AUTH HEADER:", req.headers.authorization);


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default userAuth;
