const ApiError = require("../../errors/ApiError");
const handleMySqlError = require("../../errors/handleMySqlError");
const handleValidationError = require("../../errors/handleValidationError");
const HTTPStatus = require("../HTTPStatus");

const globalErrorHandler = async (error, req, res, next) => {
    try {
        let statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
        let message = 'Something went wrong!';
        let errorMessages = [];
        if (error?.name == 'ValidationError') {
            const simplifiedError = handleValidationError(error);
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessages = simplifiedError.errorMessages;
        }
        // Handle MySQL Errors
        else if (error?.code && error?.sqlMessage) {
            const mySqlError = handleMySqlError(error);
            statusCode = mySqlError.statusCode;
            message = mySqlError.message;
            errorMessages = mySqlError.errorMessages;
        }
        else if (error instanceof ApiError) {
            statusCode = error?.statusCode;
            message = error.message;
            errorMessages = error?.message
                ? [
                    {
                        path: '',
                        message: error?.message,
                    },
                ]
                : [];
        }
        else if (error instanceof Error) {
            message = error?.message;
            errorMessages = error?.message
                ? [
                    {
                        path: '',
                        message: error?.message,
                    },
                ]
                : [];
        }
        return res.status(statusCode).send({
            error: {
                message: message,
                errorMessages: errorMessages,
                stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined,
            }
        });
    } catch (err) {
        console.error('Error in globalErrorHandler:', err);
        next(err)
    }
}

module.exports = globalErrorHandler;