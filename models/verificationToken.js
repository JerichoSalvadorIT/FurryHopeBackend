const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const verificationTokenSchema = mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        
        token: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            expires: 3600,
            default: Date.now()
        }
    }
)

// Encrypting the token before saving it to the db
verificationTokenSchema.pre('save', async function(next) {
    if(!this.isModified('token')) {
        next();
    }

    // Generating a salt (the higher the value, the more secured it is)
    const salt = await bcrypt.genSalt(10);

    // Encrypting the token with the salt 
    this.token = await bcrypt.hash(this.token, salt);
});

// Comparing the entered token with the token inside the database
verificationTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token)
    return result
}

const VerificationToken = mongoose.model('VerificationToken', verificationTokenSchema);

module.exports = VerificationToken;