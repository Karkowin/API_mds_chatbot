// IMPORTS
// --------------------------------------------------------------------------
import express from "express";
import cors from "cors";
import env from "./env.conf.ts";
import { apiRouter } from "./router/api.router.ts";
import { setup } from "./controller/tool/dbSetup.tool.ts";

// VERIFY ENV
// --------------------------------------------------------------------------
async function main<Void>() {
  if (await setup()) {
    server();
  }
}

// START SERVER
// --------------------------------------------------------------------------
function server<Void>() {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: "GET, PUT, POST, DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 200,
    })
  );
  app.use("/api", apiRouter);
  app.listen(env.server.port, () => {
    console.log(`Server is listening on port ${env.server.port}`);
  });
}

main();
