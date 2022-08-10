const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// This is a function to authenticate a user from un-authorized access
// and 
const authenticate = asyncHandler(async (req, res, next) => {
    let token

    if (
        // Checks the token that was sent from a request, and to check if it's a bearer token
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Splitting the bearer token and only getting the token part then verify the token.
            token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const decoded_token = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded_token)

            // Gets the user from the token that was verified
            req.user = await User.findById(decoded_token.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not Authorized, token failed')
    }
})

module.exports = { authenticate }