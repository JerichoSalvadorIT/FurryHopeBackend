const { isValidObjectId } = require('mongoose');
const ResetPasswordToken = require('../models/resetPasswordToken');
const User = require('../models/userModel')
const Admin = require('../models/adminModel')

const isResetTokenValid = async (req, res, next) => {
    const { token, id } = req.query;
    if (!token || !id) {
        throw new Error('Invalid Request')
    }

    if (!isValidObjectId(id)) {
        throw new Error('Invalid User Id')
    }

    // Check for the user
    const user = await User.findById(id)

    if (!user) {
        throw new Error('User not found.')
    }

    // Finds the user's reset token based on the owner
    const resetToken = await ResetPasswordToken.findOne({ owner: user._id })

    if (!resetToken) {
        throw new Error('Reset password token not found.')
    }

    // To check if the token from the request is equal to the one inside the database.
    const isValid = await resetToken.compareToken(token)

    if (!isValid) {
        throw new Error('Reset token is invalid')
    }

    req.user = user
    next()
}

const adminResetValid = async(req, res, next) => {
    const { token, id } = req.query;
    if (!token || !id) {
        throw new Error('Invalid Request')
    }

    if (!isValidObjectId(id)) {
        throw new Error('Invalid User Id')
    }

    // Check for the user
    const admin = await Admin.findById(id)

    if (!admin) {
        throw new Error('User not found.')
    }

    // Finds the user's reset token based on the owner
    const resetToken = await ResetPasswordToken.findOne({ owner: admin._id })

    if (!resetToken) {
        throw new Error('Reset password token not found.')
    }

    // To check if the token from the request is equal to the one inside the database.
    const isValid = await resetToken.compareToken(token)

    if (!isValid) {
        throw new Error('Reset token is invalid')
    }

    req.admin = admin
    next()
}

module.exports = { isResetTokenValid, adminResetValid }