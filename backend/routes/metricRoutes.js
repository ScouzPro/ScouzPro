import express from "express"
import {getPlayerMetrics, savePlayerMetrics, updatePlayerMetric, deletePlayerMetric,getPlayerMetricById} from "../controllers/metricsController.js"


const router = express.Router();

router.get('/metrics', getPlayerMetrics);
router.get('/metrics/:id', getPlayerMetricById)
router.post('/metrics', savePlayerMetrics);
router.put('/metrics/:id', updatePlayerMetric);
router.delete('/metrics/:id', deletePlayerMetric)

export default router;