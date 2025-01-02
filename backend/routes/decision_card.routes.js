import express from "express";
import { createCard, deleteCardById, getAllCards } from "../controller/decision_card.controller.js";
const app = express();
const router = express.Router();

router.post("/card", createCard)
router.get("/cards", getAllCards)
router.delete("/card/:id", deleteCardById);


export default router