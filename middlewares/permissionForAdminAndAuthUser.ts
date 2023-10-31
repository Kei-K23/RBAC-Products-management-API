// import { Request, Response, NextFunction } from "express";
// import { ALL_PERMISSIONS } from "../config/permissions";

// export default  () => (req: Request, res: Response, next: NextFunction) => {

//     const { applicationId, userId } = req.params;
//   const existingUser = res.locals.user;

//   const isSuperAdminPermissions =
//     JSON.stringify(existingUser.permissions) ===
//       JSON.stringify(ALL_PERMISSIONS) &&
//     existingUser.applicationId === applicationId;

//   try {
//     const user = await ;

//     if (!user)
//       return res
//         .status(404)
//         .json({ status: 404, error: "user cannot find" })
//         .end();

//     if (
//       user._id !== existingUser.userId &&
//       user.applicationId !== existingUser.applicationId
//     ) {
//       if (isSuperAdminPermissions) {
//         await deleteUser({ _id: userId, applicationId });
//       } else {
//         return res
//           .status(403)
//           .json({
//             status: 403,
//             error:
//               "forbidden! you are not authorized user to delete this account",
//           })
//           .end();
//       }
//     }

//     if (
//       user._id === existingUser.userId &&
//       user.applicationId === existingUser.applicationId
//     )

//   return next();
// }
