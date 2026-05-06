import { Router } from "express";
import { listOpportunities } from "../services/dataStore.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(listOpportunities());
});

export default router;
