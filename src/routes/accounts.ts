import { Router } from "express";
import { getAccountBundle, listAccounts } from "../services/dataStore.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(listAccounts());
});

router.get("/:id", (req, res, next) => {
  const bundle = getAccountBundle(req.params.id);

  if (!bundle) {
    const error = new Error(`Account ${req.params.id} was not found.`) as Error & {
      statusCode?: number;
    };
    error.statusCode = 404;
    return next(error);
  }

  return res.json(bundle);
});

export default router;
