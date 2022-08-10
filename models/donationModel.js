const mongoose = require('mongoose')

const donationSchema = mongoose.Schema(
    {
        dateOfDonation: {
            type: String,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        contactNo: {
            type: String,
            required: true,
        },

        items: {
            type: [],
            required: true,
        },

        received: {
            type: String,
            default: 'Not Received',
        },

        profilePicture: {
            type: String,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    },
    {
        timestamps: true,
    }
)

const Donation = mongoose.model('Donation', donationSchema)

module.exports = Donation