import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { version } from "../package.json";
import logger from "./logger";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "RBAC with Products management API Docs",
      version,
      description:
        "This is REST API that is full authentication and authorization with Multi-Tenanted, Role-Based Access Control System with managing Products.",
    },
    components: {
      securitySchemas: {
        cookieAuth: {
          type: "http",
          schema: "token",
          cookieFormat: "JWT",
        },
        security: [
          {
            cookieAuth: [],
          },
        ],
      },
    },
  },
  apis: ["./../routes/*.ts", "./../schema/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function swaggerDocs(app: Express, port: number) {
  //swagger page
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec).end();
  });
  logger.info(`Docs available at http://localhost:${port}/docs`);
}
