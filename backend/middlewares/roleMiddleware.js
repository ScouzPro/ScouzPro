// import { User } from "../models/authModels.js"

export const verifyRole = async (req, res, next) => {
    const id= req.user._id
    const userRole= await User.findById(id)
    if (userRole.role !== "admin") {
        return res.status(401).json({ message: "No tienes permisos para acceder a esta funcionalidad." });
    }
    next();
};
