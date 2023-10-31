import { Request, Response } from "express";
import { CreateRoleInput } from "../schema/role.schema";
import { createRole } from "../services/role.service";

export async function createRoleHandler(
  req: Request<{}, {}, CreateRoleInput>,
  res: Response
) {
  try {
    const role = await createRole(req.body);
    if (!role)
      return res
        .status(500)
        .json({
          status: 500,
          error: "could not create role for the application",
        })
        .end();

    return res.status(201).json({ status: 201, data: role });
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}
