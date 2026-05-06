import { Router } from "express";
import { listCampaigns } from "../services/dataStore.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(listCampaigns());
});

export default router;
