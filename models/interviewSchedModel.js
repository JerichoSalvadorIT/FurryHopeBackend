const mongoose = require('mongoose')

const interviewSchedSchema = mongoose.Schema(
    {
        recipientEmail: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        applicant: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const InterviewSched = mongoose.model('InterviewSched', interviewSchedSchema);
module.exports = InterviewSched