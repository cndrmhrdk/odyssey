const errorHandler = (err, req, res, next) => {
    // Error dari zod
    if (err.issues) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: err.issues.map((issue) => issue.message),
        });
    }

    // Error biasa
    return res.status(400).json({
        success: false,
        message: err.message || "Internal server error",
    });
};

module.exports = errorHandler;