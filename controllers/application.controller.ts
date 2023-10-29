import { Request, Response } from "express";
import { CreateApplicationInput } from "../schema/application.schema";
import {
  createApplication,
  getApplications,
} from "../services/application.service";
import { createRole } from "../services/role.service";
import {
  APPLICATION_USER_PERMISSION,
  MUTABLE_ALL_PERMISSIONS,
  SYSTEM_ROLE,
} from "../config/permissons";

export async function createApplicationHandler(
  req: Request<{}, {}, CreateApplicationInput>,
  res: Response
) {
  try {
    const application = await createApplication({ name: req.body.name });

    const adminRole = await createRole({
      applicationId: application._id,
      name: SYSTEM_ROLE.SUPER_ADMIN,
      permissions: MUTABLE_ALL_PERMISSIONS,
    });
    const applicationUserRole = await createRole({
      applicationId: application._id,
      name: SYSTEM_ROLE.APPLICATION_USER,
      permissions: APPLICATION_USER_PERMISSION,
    });
    return res
      .status(201)
      .json({
        status: 201,
        data: [application, adminRole, applicationUserRole],
      })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function getApplicationsHandler(req: Request, res: Response) {
  try {
    const applications = await getApplications();

    if (!applications)
      return res.status(400).json({ error: "no application to provide" });

    return res
      .status(200)
      .json({
        status: 200,
        data: applications,
      })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}
