const mongoose = require('mongoose')

const totalCountSchema = mongoose.Schema(
    {
        currentCount: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const TotalCount = mongoose.model('TotalCount', totalCountSchema)
module.exports = TotalCount
