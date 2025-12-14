import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const auth = async (request, response, next) => {
    try {
        // Get the token from Authorization header or cookies
        const token = request.headers.authorization?.split(" ")[1] || request.cookies?.accessToken;
        console.log("Token received in backend:", token); // Debugging

        if (!token) {
            return response.status(401).json({
                message: "Token not provided. Please log in.",
                error: true,
                success: false
            });
        }

        // Verify JWT token
        let decoded;
        try {
            // Verify the token using the secret key

            decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

            console.log("Decoded token:", decoded); // Debugging
        } catch (err) {
            console.log("JWT Error:", err.message); // Debug why token verification failed
            return response.status(401).json({
                message: "Invalid or expired token. Please log in again.",
                error: true,
                success: false
            });
        }
     
        // Ensure decoded token contains user ID
        if (!decoded || !decoded.id) {
            return response.status(401).json({
                message: "Unauthorized access. Invalid token payload.",
                error: true,
                success: false
            });
        }

        // Fetch user from database
        const user = await UserModel.findById(decoded.id).select("-password"); // Exclude password for security

        if (!user) {
            return response.status(404).json({
                message: "User not found. Please log in again.",
                error: true,
                success: false
            });
        }

        // Attach user information to request
        request.userId = user._id;
        request.user = user;

        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error.message); // Improved error logging
        return response.status(500).json({
            message: "Internal server error. Please try again later.",
            error: true,
            success: false
        });
    }
};

export default auth;