import express from "express";
import { generatePairs, showPair, updateRanking } from "../controller/elo.controller.js";
const app = express();
const router = express.Router();

router.get("/generatePairs", generatePairs)
router.get("/showPair", showPair)
router.post("/updateRanking", updateRanking);


export default router