import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import activitiesRouter from "./routes/activities.js";
import accountsRouter from "./routes/accounts.js";
import assistantRouter from "./routes/assistant.js";
import campaignsRouter from "./routes/campaigns.js";
import healthRouter from "./routes/health.js";
import opportunitiesRouter from "./routes/opportunities.js";
import revenueRouter from "./routes/revenue.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const docsPath = path.join(process.cwd(), "docs", "openapi.yaml");
const openApiDocument = yaml.load(fs.readFileSync(docsPath, "utf8"));

app.locals.serviceName = process.env.SERVICE_NAME || "Revenue Ops AI Assistant";

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/health", healthRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/opportunities", opportunitiesRouter);
app.use("/api/campaigns", campaignsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/revenue", revenueRouter);
app.use("/api/assistant", assistantRouter);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.method} ${req.originalUrl} was not found.`) as Error & {
    statusCode?: number;
  };
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

export default app;
