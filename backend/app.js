import express from "express";
const app = express();
import errorMiddleware from './middleware/Error.js'


app.use(express.json());

// Route imports
import decisionCardRoutes from './routes/decision_card.routes.js'
import eloRoutes from './routes/elo.routes.js'

// using routes
app.use("/api/v1", decisionCardRoutes)
app.use("/api/v1/", eloRoutes)

// this middleware should be used at the last
app.use(errorMiddleware)

export default app