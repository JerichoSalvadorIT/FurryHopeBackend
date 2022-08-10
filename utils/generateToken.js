const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// Generates a token that will be sent to the client
// and uses the token to certify the user identity
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // The jwt token expires after 30 days
    });
}


// Generate a token for resetting the user's password.
const generateResetPasswordToken = () => new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
        if (err) reject(err)
        
        const token = buff.toString('hex')
        resolve(token)
    })
}) 
    

module.exports = { generateToken, generateResetPasswordToken };