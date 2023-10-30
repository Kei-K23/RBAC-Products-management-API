import { Request, Response, NextFunction } from "express";

interface ParsedCookie {
  [key: string]: string;
}

export default function (req: Request, res: Response, next: NextFunction) {
  const { cookie } = req.headers;
  if (cookie) {
    const values = cookie.split(";").reduce((acc: ParsedCookie, cur) => {
      const data = cur.trim().split("=");

      return { ...acc, [data[0]]: data[1] };
    }, {});
    res.locals.cookie = values;
  } else {
    res.locals.cookie = {};
  }
  return next();
}
