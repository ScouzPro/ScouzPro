import {User} from "../models/authModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

//codifcar: los enviamos de un luar a otro sin exponerlo, perono estan seguros
//encriptar o llave publica/privada: generqa un hash a traves de algoritmos pero se itera cada cierto tiempo con un algoritmo

//CONTROLADOR REGISTROS
export const Register = async (req, res) => {
    const {name, lastname, username, password, repeatPassword, email, terms, } = req.body; //esta es la informacion que va a buscar la api, la metemos toda en una constante y usamos el req.body para que las coja todas
    // console.log(username)
    try {
        const existingEmail = await User.findOne({email:email}) //finOne/findAll/etc, metodos del mongoose
        if (existingEmail) {
            return res.status(400).json({message: "Este email ya existe"}) //400 error/status de base de datos
        }
        //constante para encriptar la contraseña, puede llamerse de otra manera, pero es mas facil de identificar ya que se llama igual que de método
        //preferible declararla despues de declarar lla contraseña (linea 4)
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // console.log(hashPassword)

        //Si no existe creamos uno nuevo
        const credentials = new User ({ //esta variable tiene que ser la misma que se llama luego al save
            //estos datos, de la const de arriba, ya cuando se mete le ha dicho en la const, anterior que req.body, asi que no  hace falta repetirlo, pero si no esta la const de arriba, hay que indicar el req.body en cada una de estas
            name: name,
            lastname: lastname,
            username: username,
            password: hashPassword,
            repeatPassword: repeatPassword,
            email: email,
            // terms: terms
        })
        await credentials.save() //Guardar los datos
        res.status(200).json({message: "Registro creado con exito", credentials})
    } catch (error) {
        res.status(500).json({message: "No se pudo crear el registro", error})
    }
}

//CONTROLADOR LOGIN
export const Login = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({username:username}) //buscamos si el usuario existe
        if (!user) { //el ! lo pone al significado contrario, es decir, si el usuario no esta en nuestra base
            return res.status(400).json({message: "Usuario invalido"})
        } else{
            const validPassword = await bcrypt.compare(password, user.password) 
            if (!validPassword) { 
                return res.status(400).json({message: "Contraseña o user incorrectos"}) 
            };
        }
        //Tras el login se genera un token
        const tokenLog = jwt.sign({ //firmo y elijo la info que quiero enviar con el token
            username: username,
            password: user.password,
        }, process.env.JWT_SECRET) 

        //Guardo la clave en un header que llamo tokenAuth y le paso la constante del token (tokenLog)
        res.header ({ "auth": tokenLog})
        res.status(200).json({message: "Login successfull", tokenLog})
        
    } catch (error) {
        res.status(500).json({message: "Could not log in", error})
    }
}