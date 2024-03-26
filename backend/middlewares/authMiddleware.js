import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.header("auth");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }

    try {
        const decoded = jwt.verify(token, "codesecret");
        req.user = decoded;
        console.log(decoded) // Esto permite que la información del usuario esté disponible en las rutas protegidas
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token inválido." });
    }
};