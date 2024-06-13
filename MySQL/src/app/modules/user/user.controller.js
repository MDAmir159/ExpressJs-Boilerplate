const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  CREATED,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  NOT_MODIFIED
} = require("../../HTTPStatus");
const {
  deleteUserQuery,
  getAllUsersQuery
} = require("../../queries/userQueries");
const {
  loginUserService,
  getAllUsersService,
  createUserService,
  updateUserInfoService,
  forgotPasswordEmailService,
  deleteUserService,
  updatePasswordService
} = require("./user.service");

const loginUser = async (req, res, next) => {
  try {
    const response = await loginUserService(req.body);
    if (response?.error) {
      throw response?.error;
    }
    switch (response.statusCode) {
      case NOT_FOUND:
        return res.status(NOT_FOUND).json({
          message: "USER NOT FOUND"
        })
      case FORBIDDEN:
        return res.status(FORBIDDEN).json({
          message: "Invalid login credential"
        })
      case OK:
        return res.status(OK).json({
          message: "SUCCESSFULLY LOGGED IN",
          accessToken: response.accessToken
        });
    }
  } catch (error) {
    next(error);
  }
}

const createUser = async (req, res, next) => {
  try {
    const response = await createUserService(req.body);
    if (response?.error) {
      throw response?.error
    }
    switch (response?.statusCode) {
      case CONFLICT:
        return res.status(CONFLICT).json({
          message: "USER ALREADY EXISTS"
        })
      case CREATED:
        return res.status(CREATED).send({ message: "USER ADDED SUCCESSFULLY" });
      default:
        break;
    }
  } catch (error) {
    next(error);
  }
}

const updateUserInfo = async (req, res, next) => {
  try {
    const response = await updateUserInfoService(req.body);
    if (response?.error) {
      throw response?.error
    }
    switch (response?.statusCode) {
      case NOT_FOUND:
        return res.status(NOT_FOUND).json({
          message: "User Not Found"
        })
      case NOT_MODIFIED:
        return res.status(NOT_MODIFIED).json({
          message: "No record is updated"
        })
      case OK:
        return res.status(OK).json({
          message: "Updated Successfully"
        })
    }
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const response = await deleteUserService(req.body);
    if (response?.error) {
      throw response?.error
    }
    switch (response?.statusCode) {
      case NOT_FOUND:
        return res.status(NOT_FOUND).json({
          message: "User Not Found"
        })
      case NOT_MODIFIED:
        return res.status(NOT_MODIFIED).json({
          message: "No record is deleted"
        })
      case OK:
        return res.status(OK).json({
          message: "Deleted Successfully"
        })
    }
  } catch (error) {
    next(error)
  }
}

const forgotPasswordEmail = async (req, res, next) => {
  try {
    const response = await forgotPasswordEmailService(req.body);
    if (response?.error) {
      throw response?.error
    }
    return res.status(OK).json({
      message: "message sent",
      server_response: response
    })
  } catch (error) {
    next(error);
  }
}

const updatePassword = async (req, res, next) => {
  try {
    const response = await updatePasswordService(req.body);
    if (response?.error) {
      throw response?.error
    }
    switch (response?.statusCode) {
      case NOT_FOUND:
        return res.status(NOT_FOUND).json({
          message: "User Not Found"
        })
      case FORBIDDEN:
        return res.status(FORBIDDEN).json({
          message: "Wrong Credentials are provided"
        })

      case NOT_MODIFIED:
        return res.status(NOT_MODIFIED).json({
          message: "No record is updated"
        })
      case OK:
        return res.status(OK).json({
          message: "Updated Successfully"
        })
    }
  } catch (error) {
    next(error)
  }
}



////////////////////





const userRemove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inputArray = [id];
    const response = await deleteUserQuery(inputArray);
    if (response) {
      return res.status(OK).json(response);
    } else {
      return res.status(NOT_FOUND).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const response = await getAllUsersService();
    if (response?.error) {
      throw (response.error)
    }
    return res.status(OK).send(response);
  } catch (error) {
    next(error);
  }
};



const addUserAPIKey = async (req, res, next) => {
  try {
    const response = await addUserAPITokenService(req.body);
    if (response?.error) {
      throw (response?.error);
    }
    return res.status(CREATED).send(response);
  } catch (error) {
    next(error);
  }
}

const updateUserAPIKey = async (req, res, next) => {
  try {
    const response = await updateUserAPITokenService(req.body);
    if (response?.error) {
      throw (response?.error);
    }
    return res.status(OK).send(response);
  } catch (error) {
    next(error);
  }
}

const retrieveUserHistory = async (req, res, next) => {
  try {
    const response = await retrieveUserHistoryService(req);
    if (response?.error) {
      throw response?.error
    }
    switch (response.statusCode) {
      case NOT_FOUND:
        return res.status(NOT_FOUND).json({
          message: "User Not Found"
        })
        break;
      case OK:
        return res.status(OK).json({
          response: response.userHistory
        })
      default:
        break;
    }
  } catch (error) {
    next(error)
  }
}




const createSuperAdminSeedUser = async (req, res, next) => {
  try {
    const response = await createSuperAdminSeedUserService(res.body);
    if (response?.error) {
      throw response?.error
    }
    switch (response?.statusCode) {
      case CONFLICT:
        return res.status(CONFLICT).json({
          message: "THIS SEED ALREADY EXISTS"
        })
      case CREATED:
        return res.status(CREATED).send({ message: "SEED USER ADDED SUCCESSFULLY. You are ALL SET!!" });
      default:
        break;
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  userRemove,
  getAllUsers,
  loginUser,
  addUserAPIKey,
  updateUserAPIKey,
  retrieveUserHistory,
  updateUserInfo,
  forgotPasswordEmail,
  createSuperAdminSeedUser,
  deleteUser,
  updatePassword
}
