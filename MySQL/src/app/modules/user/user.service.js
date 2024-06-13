const { v4: uuid } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const {
    createUserQuery,
    getUserByEmailQuery,
    updateUserInfoQuery,
    deleteUserQuery,
    updatePasswordQuery,
} = require('../../queries/userQueries');

const { getUserRoleNameByUserIdService } = require('../userroles/userroles.service');
const { API_EMAIL, JWT_SECRET_KEY } = require('../../../config');
const { transporter } = require('../../../config/mailSetup');
const { NOT_FOUND, OK, CREATED, CONFLICT, UNAUTHORIZED, FORBIDDEN, NOT_MODIFIED } = require('../../HTTPStatus');
const { normalizeEmail, getUserNameFromEmail, normalizeUserName } = require('../../middlewares/normalize');
const { hashPassword } = require('../../middlewares/hashPassword');

const createUserService = async (payload) => {
    const id = uuid();
    const { email, password } = payload;
    const passwordHash = await hashPassword(password);
    const userName = getUserNameFromEmail(email);
    const normalizedUserName = normalizeUserName(userName);
    const normalizedEmail = normalizeEmail(email);
    try {
        const searchUserResponse = await getUserByEmailQuery(normalizedEmail);
        if (searchUserResponse?.length > 0) {
            return { statusCode: CONFLICT }
        }
        const isActive = 1
        const inputArray = [
            id, userName, normalizedUserName, email, normalizedEmail, passwordHash, isActive
        ];
        const response = await createUserQuery(inputArray);
        if (response?.error) {
            throw response?.error
        }
        return {
            statusCode: CREATED,
            userDetails: {
                userId: id,
                email: email,
                userName: userName,
            }
        }
    } catch (error) {
        return { error: error }
    }
}

const loginUserService = async (payload) => {
    let { email, password } = payload;
    const normalizedEmail = normalizeEmail(email);
    try {
        const userInfoResponse = await getUserByEmailQuery(normalizedEmail);
        if (userInfoResponse.length === 0) {
            return { statusCode: NOT_FOUND }
        }
        const user = userInfoResponse[0];
        const userId = user.id;
        const userRoleServiceResponse = await getUserRoleNameByUserIdService({ id: userId });
        const userRole = userRoleServiceResponse.length === 0 ? "" : userRoleServiceResponse[0].roleName;
        const isPasswordMatched = await bcrypt.compare(password, user.passwordHash)
        if (isPasswordMatched === true) {
            const tokenPayload = {
                userId: user.id,
                userName: user.userName,
                userRole: userRole,
                email: user.normalizedEmail
            };
            const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
            return {
                statusCode: OK,
                accessToken: accessToken
            }
        } else {
            return { statusCode: FORBIDDEN }
        }
    } catch (error) {
        return { error: error }
    }
}

const updateUserInfoService = async (payload) => {
    const { userName = "", name = "", email, phoneNumber = "", id } = payload;

    const normalizedEmail = normalizeEmail(email);
    try {
        const userSearchResponse = await getUserByEmailQuery(normalizedEmail);
        if (userSearchResponse?.error) {
            throw userSearchResponse?.error
        }
        if (userSearchResponse.length === 0) {
            return { statusCode: NOT_FOUND }
        }
        const userId = userSearchResponse[0].id;
        const inputObj = {
            userId, normalizedEmail, phoneNumber, userName, name
        }
        const updateUserResponse = await updateUserInfoQuery(inputObj);
        if (updateUserResponse?.error) {
            throw updateUserResponse?.error
        }
        if (updateUserResponse?.affectedRows === 1) {
            return { statusCode: OK }
        } else {
            return { statusCode: NOT_MODIFIED }
        }
    } catch (error) {
        return { error: error }
    }
}

const deleteUserService = async (payload) => {
    const { email } = payload;
    const normalizedEmail = normalizeEmail(email);
    try {
        const userSearchResponse = await getUserByEmailQuery(normalizedEmail);
        if (userSearchResponse?.error) {
            throw userSearchResponse?.error
        }
        if (userSearchResponse.length === 0) {
            return { statusCode: NOT_FOUND }
        }
        const userId = userSearchResponse[0].id;
        const inputObj = {
            userId
        }
        const deleteUserResponse = await deleteUserQuery(inputObj);
        if (deleteUserResponse?.error) {
            throw deleteUserResponse?.error
        }
        if (deleteUserResponse?.affectedRows === 1) {
            return { statusCode: OK }
        } else {
            return { statusCode: NOT_MODIFIED }
        }
    } catch (error) {
        return { error: error }
    }
}

const forgotPasswordEmailService = async (payload) => {
    const { email } = payload;
    let message = {
        from: `"No Reply" <${API_EMAIL}>`,
        to: email,
        subject: 'Password',
        html: "<b>Hello!</b> <br/> Click here to reset your password."
    };
    try {
        let info = await transporter.sendMail(message);
        return info;
    } catch (error) {
        return { error: error }
    }
}

const updatePasswordService = async (payload) => {
    const { email, currentPassword, newPassword } = payload;
    const normalizedEmail = normalizeEmail(email);
    try {
        const userSearchResponse = await getUserByEmailQuery(normalizedEmail);
        if (userSearchResponse?.error) {
            throw userSearchResponse?.error
        }
        if (userSearchResponse.length === 0) {
            return { statusCode: NOT_FOUND }
        }
        const userId = userSearchResponse[0].id;
        const currentPasswordHash = userSearchResponse[0].passwordHash;
        const isOldPasswordMatched = await bcrypt.compare(currentPassword, currentPasswordHash)
        if (isOldPasswordMatched === false) {
            return { statusCode: FORBIDDEN }
        }
        const newPasswordHash = await hashPassword(newPassword);
        const inputObj = {
            userId, newPasswordHash
        }
        const updatePasswordResponse = await updatePasswordQuery(inputObj);
        if (updatePasswordResponse?.error) {
            throw updatePasswordResponse?.error
        }
        if (updatePasswordResponse?.affectedRows === 1) {
            return { statusCode: OK }
        } else {
            return { statusCode: NOT_MODIFIED }
        }
    } catch (error) {
        return { error: error }
    }
}

//////////////

const getAllUsersService = async () => {
    try {
        let docs = await getAllUsersQuery();
        return docs;
    } catch (error) {
        return { error: error };
    }
};

const getUserByEmailService = async (email) => {
    const normalizedEmail = normalizeEmail(email);
    try {
        const response = await getUserByEmailQuery(normalizedEmail);
        return response;
    } catch (error) {
        return { error: error }
    }
}




module.exports = {
    createUserService,
    getAllUsersService,
    getUserByEmailService,
    loginUserService,
    updateUserInfoService,
    forgotPasswordEmailService,
    deleteUserService,
    updatePasswordService
};
