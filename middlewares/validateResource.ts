import { Request, Response, NextFunction } from "express";

import { AnyZodObject } from "zod";

export default (resource: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      resource.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      return next();
    } catch (e: any) {
      return res.status(400).json({ error: e.message }).end();
    }
  };
