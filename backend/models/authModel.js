import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    name: {type: String, require: true},
    lastName: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    repeatpassword: { type: String, require: true},
    email: {type: String, require: true},
    terms: {type: Boolean, require: true},
    role: {type: String, default: "user", enum: ["user", "admin"], require: true} //default hace el nuevo item, por defecto, un "user", y luego enumera los otros valores que hay, en este caso user y admin
}, {timestamp: true}
);


export const User = mongoose.model("users", authSchema)  
//definir variable que vamos a usar en el controlador(User), que contiene el nombre de nuestra tabla(users) y el modelo que acabamos de crear (authSchema)