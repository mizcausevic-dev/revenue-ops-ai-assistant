import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: req.app.locals.serviceName,
    uptime: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString()
  });
});

export default router;
