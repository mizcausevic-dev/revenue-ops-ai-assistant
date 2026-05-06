import { Router } from "express";
import { getRevenueSummary } from "../utils/metrics.js";

const router = Router();

router.get("/summary", (req, res) => {
  res.json(getRevenueSummary());
});

export default router;
