const mongoose = require('mongoose')

const animalSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        color: {
            type: String,
            required: true,
        },

        breed: {
            type: String,
            default: 'Unknown / Not Specified'
        },

        description: {
            type: String,
            default: 'No description given about the animal was given.'
        },

        gender: {
            type: String,
        },

        type: {
            type: String,
            required: true
        },

        size: {

        },

        animalImg: {
            type: String,
            default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        },
        
        adoptionStatus: {
            type: String,
            default: 'Not Adopted'
        },

        availUntil: {
            type: String,
            required: true
        },

        availUntilYear: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

// The animal model
const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;