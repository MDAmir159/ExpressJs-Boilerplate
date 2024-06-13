// const bcrypt = require("bcrypt");
// const { v4: uuid } = require('uuid');
// const jwt = require('jsonwebtoken');
// const config = require("../../../config");
// const {
//   getUserById,
//   updateUserPassword,
//   createUserQuery
// } = require("../../queries/authQueries");
// const {
//   getUserNameFromEmail,
//   normalizeUserName,
//   normalizeEmail
// } = require("../../middlewares/normalize");
// const { getUserByEmailQuery } = require("../../queries/userQueries");
// const { CONFLICT, CREATED, NOT_FOUND, UNAUTHORIZED, OK } = require("../../HTTPStatus");
// const { createRolesService } = require("../roles/roles.service");

// const createUserService = async (payload) => {
//   const id = uuid();
//   const { email, password } = payload;
//   const passwordHash = await hashPassword(password);
//   const userName = getUserNameFromEmail(email);
//   const normalizedUserName = normalizeUserName(userName);
//   const normalizedEmail = normalizeEmail(email);
//   try {
//     const searchUserResponse = await getUserByEmailQuery(normalizedEmail);
//     if (searchUserResponse?.length > 0) {
//       return { statusCode: CONFLICT }
//     }
//     const isActive = 1
//     const inputArray = [[id, userName, normalizedUserName, email, normalizedEmail, passwordHash, isActive]];

//     const response = await createUserQuery(inputArray);
//     if (response?.error) {
//       throw response?.error
//     }
//     return { statusCode: CREATED }
//   } catch (error) {
//     return { error: error }
//   }
// }

// const loginUserService = async (payload) => {
//   let { email, password } = payload;
//   const normalizedEmail = normalizeEmail(email);
//   try {
//     const userInfoResponse = await getUserByEmailQuery(normalizedEmail);
//     if (userInfoResponse.length === 0) {
//       return { statusCode: NOT_FOUND }
//     }
//     const user = userInfoResponse[0];
//     if (await bcrypt.compare(password, user.passwordHash)) {
//       const tokenPayload = {
//         userId: user.userId,
//         userName: user.userName,
//         userRole: user.userRole,
//         email: user.email
//       };
//       const accessToken = jwt.sign(tokenPayload, config.JWT_SECRET_KEY);
//       return {
//         statusCode: OK,
//         accessToken: accessToken
//       }
//     } else {
//       return { statusCode: UNAUTHORIZED }
//     }
//   } catch (error) {
//     return { error: error }
//   }
// }

// //   const inputArray = [username];
// //   let user = await loginUser(inputArray);
// //   if (user.length == 0) {
// //     return { error: { message: "user does not exist" } }
// //   };
// //   let isValidPassword = await comparePassword(password, user.password);
// //   if (!isValidPassword) {
// //     return { error: { message: "invalid credentials" } };
// //   }
// //   let jwtSecretKey = config.JWT_SECRET_KEY;
// //   let data = {
// //     time: new Date(),
// //     userId: user.id,
// //     username: user.username,
// //     doctor_id: user.doctor_id,
// //   }
// //   const token = jwt.sign(data, jwtSecretKey);
// //   const result = {
// //     accessToken: token,
// //   }
// //   return result;
// // } catch (error) {
// //   return { error }
// // }
// // }
// const hashPassword = async (plaintextPassword) => {
//   const hash = await bcrypt.hash(plaintextPassword, 10);
//   return hash;
// }

// // compare password
// const comparePassword = async (plaintextPassword, hash) => {
//   const result = await bcrypt.compare(plaintextPassword, hash);
//   return result;
// }

// const updatePasswordService = async (payload) => {
//   try {
//     const { email, oldPassword, newPassword } = payload;
//     const normalizedEmail = normalizeEmail(email);
//     let docs = await getUserByEmailQuery(normalizedEmail);
//     if (docs.length === 0) {
//       return { error: 'User not found' };
//     }
//     const userPassword = docs[0].passwordHash
//     let isValidPassword = await comparePassword(oldPassword, userPassword);
//     if (!isValidPassword) return { error: { message: `invalid old password ` } };

//     if (payload.newPassword != payload.confirmPassword) return { error: { message: `did not match new password and confirm password ` } };
//     let newPass = await hashPassword(payload.newPassword);
//     inputArray = [newPass, user.id];
//     docs = await updateUserPassword(inputArray);
//     user = docs;
//     delete user["password"];
//     return { ...user };
//   } catch (error) {
//     return { error }
//   }
// }

// const createSuperAdminSeedUserService = async (payload) => {

//   try {
//     const createAdminUserResponse = await createUserService(payload);
//     if (createAdminUserResponse?.error) {
//       throw createAdminUserResponse?.error
//     }
//     if (createAdminUserResponse?.response) {
//       return { statusCode: CONFLICT }
//     }
//     const createSuperAdminRoleResponse = await createRolesService(payload);
//     if (createSuperAdminRoleResponse?.error) {
//       throw createSuperAdminRoleResponse?.error
//     }
//     if (createSuperAdminRoleResponse?.response) {
//       return { statusCode: CONFLICT }
//     }
//     return {statusCode: CREATED}

//   } catch (error) {
//     return { error: error }
//   }
// }
// module.exports = {
  // createUserService,
  // loginUserService,
  // updatePasswordService,
  // createSuperAdminSeedUserService
// }
