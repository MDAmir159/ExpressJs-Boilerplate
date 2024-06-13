const HTTPStatus = require("../app/HTTPStatus");

const handleMySqlError = (error) => {
    let statusCode = HTTPStatus.BAD_REQUEST;
    let message = 'MySQL Error';
    let errorMessages = [];

    if (error.code) {
        switch (error.code) {
            case 'ER_DUP_ENTRY':
                statusCode = HTTPStatus.CONFLICT;
                message = 'Duplicate entry error';
                errorMessages = [
                    {
                        path: '',
                        message: error?.sqlMessage || 'Duplicate entry for a unique key.',
                    },
                ];
                break;
            case 'ER_NO_REFERENCED_ROW':
                statusCode = HTTPStatus.NOT_FOUND; // Referenced row not found
                message = 'Referenced row not found';
                errorMessages = [
                    {
                        path: '',
                        message: error?.sqlMessage || 'Referenced row not found in the related table.',
                    },
                ];
                break;
            case 'ER_PARSE_ERROR':
                statusCode = HTTPStatus.BAD_REQUEST;
                message = 'Parse error';
                errorMessages = [
                    {
                        path: '',
                        message: error?.sqlMessage || 'SQL query could not be parsed.',
                    },
                ];
                break;
            case 'ER_ACCESS_DENIED_ERROR':
            case 'ECONNREFUSED':
                statusCode = HTTPStatus.FORBIDDEN;
                message = 'Access denied error';
                errorMessages = [
                    {
                        path: '',
                        message: error?.sqlMessage || 'Access denied for the user to the specified database.',
                    },
                ];
                break;
            case 'PROTOCOL_CONNECTION_LOST':
                statusCode = HTTPStatus.SERVICE_UNAVAILABLE;
                message = 'Connection lost with the database';
                errorMessages = [
                    {
                        path: '',
                        message: error?.sqlMessage || 'The connection to the database server was lost.',
                    },
                ];
                break;
            case 'ER_CON_COUNT_ERROR':
                statusCode = HTTPStatus.SERVICE_UNAVAILABLE;
                message = 'Connection limit exceeded';
                errorMessages = [
                    {
                        path: '',
                        message: error?.sqlMessage || 'The connection limit for the user has been exceeded.',
                    },
                ];
                break;
            case 'ER_BAD_FIELD_ERROR':
                statusCode = HTTPStatus.BAD_REQUEST;
                message = 'Bad field error';
                errorMessages = [
                    {
                        path: '',
                        message: error?.sqlMessage || 'A field in the SQL statement was not recognized.',
                    },
                ];
                break;
            default:
                statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
                message = 'Unhandled MySQL Error';
                errorMessages = [
                    {
                        path: '',
                        message: error?.sqlMessage || 'An unexpected MySQL error occurred.',
                    },
                ];
                break;
        }
    }
    if (error.stack) {
        errorStack = error.stack;
    }

    return {
        statusCode,
        message,
        errorMessages,
        errorStack
    };
};

module.exports = handleMySqlError;
