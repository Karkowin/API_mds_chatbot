import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
