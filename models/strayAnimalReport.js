const mongoose = require('mongoose')

const strayAnimalSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
        },

        status: {
            type: String,
            default: 'Pending'
        },

        viewed: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)

const StrayAnimalReport = mongoose.model('StrayAnimalReport', strayAnimalSchema)

module.exports = StrayAnimalReport