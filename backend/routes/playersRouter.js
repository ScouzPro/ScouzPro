import express from "express";
import { createPlayer, deletePlayer, getOnePlayer, getPlayers, updatePlayer } from "../controllers/playersController.js";
import { authMiddleware } from '../middlewares/authMiddleware.js'


const playerRouter = express.Router();

// Crear Player
playerRouter.post('/', createPlayer)
playerRouter.get('/', authMiddleware, getPlayers)
playerRouter.get('/:id', getOnePlayer)
playerRouter.delete('/:id', deletePlayer)
playerRouter.put('/:id', updatePlayer)


export default playerRouter;