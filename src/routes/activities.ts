import { Router } from "express";
import { listActivities } from "../services/dataStore.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(listActivities());
});

export default router;
