import express  from "express";
import { saveSeasonGame, getSeasonById, updateSeason } from "../controllers/seasonController.js";

const seasonRouter = express.Router();

seasonRouter.post('/', saveSeasonGame)
seasonRouter.get('/:id', getSeasonById)
seasonRouter.put('/:id', updateSeason);

export default seasonRouter;