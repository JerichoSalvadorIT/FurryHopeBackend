const mongoose = require('mongoose')

// _id, applicantId, name, email, contactNo, address, validId, animalName, animalBreed, 
const adoptionSchema = mongoose.Schema(
    {
        animalId: {
            type: String,
            required: true,
        },

        applicantName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        contactNo: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        applicantImg: {
            type: String,
            required: true,
        },

        validId: {
            type: String,
            required: true,
        },

        animalName: {
            type: String,
            required: true
        },

        animalBreed: {
            type: String,
            required: true
        },

        animalType: {
            type: String,
            required: true
        },

        animalGender: {
            type: String,
            required: true
        },

        animalColor: {
            type: String,
            required: true
        },

        animalImg: {
            type: String,
            required: true,
        },

        adoptionStatus: {
            type: String, 
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        applicationStatus: {
            type: String,
            required: true,
        },

        hasBeenInterviewed: {
            type: Boolean,
        },

        hasPaid: {
            type: Boolean,
        },

        adoptionReference: {
            type: String,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    },
    {
        timestamps: true
    },
)

const Adoption = mongoose.model('Adoption', adoptionSchema)
module.exports = Adoption