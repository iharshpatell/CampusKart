import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"]
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true,
        // validate: {
        //     validator: function(email) {
        //         return email.endsWith("iiitg.ac.in"); // Ensure email belongs to the institute
        //     },
        //     message: "Only IIITG email addresses are allowed."
        // }
    },
    password: {
        type: String,
        required: [true, "Provide password"]
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    refresh_token: {
        type: String,
        default: ""
    },
    isVerified: {  
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "address"
        }
    ],
    saved_items: [  // Previously shopping_cart
        {
            type: mongoose.Schema.ObjectId,
            ref: "item"
        }
    ],
    transactionHistory: [  // Previously orderHistory
        {
            type: mongoose.Schema.ObjectId,
            ref: "transaction"
        }
    ],
    borrowRequests: [  // To track borrow requests
        {
            type: mongoose.Schema.ObjectId,
            ref: "borrowRequest"
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
