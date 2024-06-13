const handleValidationError = (error) => {
    const errors = error.details.map((detail) => {
        return {
            path: detail.path[detail.path.length - 1],
            message: detail.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};

module.exports = handleValidationError;
