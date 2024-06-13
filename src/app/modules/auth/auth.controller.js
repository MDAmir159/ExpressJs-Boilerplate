// const { CREATED, OK, BAD_REQUEST, CONFLICT, NOT_FOUND, UNAUTHORIZED } = require("../../HTTPStatus");
// const {
//   createUserService,
//   loginUserService,
//   updatePasswordService,
//   createSuperAdminSeedUserService
// } = require("./auth.service");

// const createUser = async (req, res, next) => {
//   try {
//     const response = await createUserService(req.body);
//     if (response?.error) {
//       throw response?.error
//     }
//     switch (response?.statusCode) {
//       case CONFLICT:
//         return res.status(CONFLICT).json({
//           message: "USER ALREADY EXISTS"
//         })
//       case CREATED:
//         return res.status(CREATED).send({ message: "USER ADDED SUCCESSFULLY" });
//       default:
//         break;
//     }
//   } catch (error) {
//     next(error);
//   }
// }
// const loginUser = async (req, res, next) => {
//   try {
//     const response = await loginUserService(req.body);
//     if (response?.error) {
//       throw response?.error;
//     }
//     switch (response.statusCode) {
//       case NOT_FOUND:
//         return res.status(NOT_FOUND).json({
//           message: "USER NOT FOUND"
//         })
//       case UNAUTHORIZED:
//         return res.status(UNAUTHORIZED).json({
//           message: "Invalid login credential"
//         })
//       case OK:
//         return res.status(OK).json({
//           message: "SUCCESSFULLY LOGGED IN",
//           accessToken: response.accessToken
//         });
//     }
//   } catch (error) {
//     next(error);
//   }
// }
// const updatePassword = async (req, res, next) => {
//   try {
//     const result = await updatePasswordService(req.user, req.body);
//     if (result.error) {
//       return res.status(BAD_REQUEST).send({ error: result.error });
//     }
//     return res.status(OK).send({ ...result });
//   } catch (error) {
//     next(error);
//   }
// }
// const createSuperAdminSeedUser = async (req, res, next) => {
//   try {
//     const response = await createSuperAdminSeedUserService(res.body);
//     if (response?.error) {
//       throw response?.error
//     }
//     switch (response?.statusCode) {
//       case CONFLICT:
//         return res.status(CONFLICT).json({
//           message: "THIS SEED ALREADY EXISTS"
//         })
//       case CREATED:
//         return res.status(CREATED).send({ message: "SEED USER ADDED SUCCESSFULLY. You are ALL SET!!" });
//       default:
//         break;
//     }
//   } catch (error) {
//     next(error);
//   }
// }

// module.exports = {
//   createUser,
//   loginUser,
//   updatePassword,
//   createSuperAdminSeedUser
// }
