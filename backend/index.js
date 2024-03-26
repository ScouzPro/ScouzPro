import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import { db } from "./database/database.js";
import playerRouter from "./routes/playersRouter.js"
import reportRoutes from "./routes/reportRoutes.js";
import playerMetricsRouter from './routes/metricRoutes.js'
import authRoutes from './routes/authRoutes.js'
import seasonRoutes from './routes/seasonRoutes.js'
// import path from 'path'

dotenv.config();

const app = express();
app.use(express.json());

//RUTAS DE USO
app.use(cors());
app.use('/', playerMetricsRouter);
app.use('/api', reportRoutes);
app.use("/player", playerRouter)
app.use("/season", seasonRoutes)
app.use("/auth", authRoutes);

//PUERTO Y DB
db();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// //RENDER
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname,'/frontend/dist')));

// app.get('*' , (req, res) => {

// res.sendFile(path.join(__dirname, 'frontend','dist','index.html'));
// })

export default app;