const mongoose = require('mongoose')

const userFeedbackSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
        },

        email: {
            type: String,
        },

        message: {
            type: String,
        },

        profilePicture: {
            type: String,
        },

        date: {
            type: String,
        },

        rating: {
            type: Number,
        },

        viewed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const UserFeedback = mongoose.model('UserFeedback', userFeedbackSchema);
module.exports = UserFeedback 