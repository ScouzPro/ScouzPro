import mongoose from "mongoose";

export const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DataBase Connected")
    } catch (error) {
        console.log(error)
    }
}