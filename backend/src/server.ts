/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author_______________: yogawilanda <eayogawilanda@gmail.com>
 * Path_________________: backend\src\server.ts
 * Purpose______________: main orchestration of backend
 * Version______________: 1.0.0
 * Status_______________: active
 * </meta_config>
 *
 * Function             : Bootstrap Express Server
 * Loc                  : server.ts
 *
 * -------------------------------------------------------------------
 */
import express from "express";
import cors from "cors";

import taskRoutes from "./routes/TaskRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});