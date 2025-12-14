export const admin = async (request, response, next) => {
    try {
        if (!request.user) {
            return response.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            });
        }

        if (request.user.role !== "ADMIN") {
            return response.status(403).json({
                message: "Permission denied",
                error: true,
                success: false
            });
        }

        next();
    } catch (error) {
        return response.status(500).json({
            message: "Permission denied",
            error: true,
            success: false
        });
    }
};
