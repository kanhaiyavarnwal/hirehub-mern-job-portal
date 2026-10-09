
import jwt from "jsonwebtoken"

const adminAuth = (req, res, next) => {
   const {token} =  req.headers;
   console.log("token in admin: ",token)
   if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided",
        });
   }
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
   console.log("14",decodedToken)
    if(decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: login again",
        });
    }
    next();
};

export default adminAuth;