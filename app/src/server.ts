// IMPORTS
// --------------------------------------------------------------------------
import express from "express";
import cors from "cors";
import env from "./env.conf.ts";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { apiRouter } from "./router/api.router.ts";

// SWAGGER
// --------------------------------------------------------------------------
const app = express();
const options = {
  info: {
    version: "1.0.0",
    title: "API MDS CHATBOT",
    description: "API MDS CHATBOT",
  },
  // security: {
  //   BasicAuth: {
  //     type: "http",
  //     scheme: "basic",
  //   },
  // },
  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.ts",
  // URL where SwaggerUI will be rendered
  swaggerUIPath: "/api-docs",
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: "/v3/api-docs",
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};
expressJSDocSwagger(app)(options);

// START SERVER
// --------------------------------------------------------------------------

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
