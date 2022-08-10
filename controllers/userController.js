const User = require('../models/userModel')
const UserFeedback = require('../models/userFeedbackModel')
const StrayAnimalReport = require('../models/strayAnimalReport')
const RegisterAnimal = require('../models/animalRegistrationModel')
const Adoption = require('../models/adoptionModel')
const Donation = require('../models/donationModel')
const VerificationToken = require('../models/verificationToken')
const ResetPasswordToken = require('../models/resetPasswordToken');
const asyncHandler = require('express-async-handler')
const { generateToken, generateResetPasswordToken } = require('../utils/generateToken')
const { generateCode, mailTransport, emailTransport, emailTemplate } = require('../utils/verifyUserUtils')
const { generateResetPasswordTemplate, plainEmailTemplate } = require('../utils/resetPasswordUtil')

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Finds the user in the db
    const userAcc = await User.findOne({ email });

    if(!userAcc.verified) {
        res.status(401)
        throw new Error(`Your account is unverified, you can't login.`)
    }

    // Authenticates the user
    if(userAcc && (await userAcc.matchPassword(password))) {
        res.json({
            id: userAcc.id,
            fullName: userAcc.fullName,
            email: userAcc.email,
            contactNo: userAcc.contactNo,
            address: userAcc.address,
            profilePicture: userAcc.profilePicture,
            animalPreference: userAcc.animalPreference,
            breedPreferences: userAcc.breedPreferences,
            colorPreferences: userAcc.colorPreferences,
            genderPreference: userAcc.genderPreference,
            sizePreference: userAcc.sizePreference,
            token: generateToken(userAcc.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, contactNo, address, password, animalPreference, breedPreferences, colorPreferences, genderPreference, sizePreference } = req.body;

    // To check if a user account already exists with the same email
    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error('A same user account already exists.');
    }

    // If the user account doesn't exist, create the new account
    const user = await User.create({
        fullName,
        email,
        contactNo,
        address,
        password,
        animalPreference,
        breedPreferences,
        colorPreferences,
        genderPreference,
        sizePreference,
    });

    // If the account was successfully created
    if(user) {
        res.status(201).json({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            contactNo: user.contactNo,
            address: user.address,
            animalPreference: user.animalPreference,
            breedPreferences: user.breedPreferences,
            colorPreferences: user.colorPreferences,
            genderPreference: user.genderPreference,
            sizePreference: user.sizePreference,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error('An Error Occurred');
    }

    // Generating the verification code to verify the user
    const code = generateCode()
    const verificationToken = new VerificationToken({
        owner: user._id,
        token: code,
    })
    
    // Stores the created verification token inside the database. (It will expire in an hour)
    await verificationToken.save()
    
    let mailOptions = {
        from: 'furryhope.mail@gmail.com',
        to: user.email,
        subject: 'Account Verification - FurryHope',
        html: emailTemplate(code)
    }

    emailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email was sent to: ${info.response}`)
        }
    })
    
    res.json({ 
        fullName,
        email,
        contactNo,
        address,
        animalPreference,
        breedPreferences,
        colorPreferences,
        genderPreference,
        sizePreference,
        // password
    });
});

const reSendCode = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email: email })

    if(user.verified) {
        throw new Error('Your account has already been verified.')
    }

    // const token = await VerificationToken.findOne({ owner: user._id })

    // if(token) {
    //     throw new Error(`Your code hasn't expired yet`)
    // }

    const code = generateCode()
    const verificationToken = new VerificationToken({
        owner: user._id,
        token: code,
    })

    await verificationToken.save()

    let mailOptions = {
        from: 'furryhope.mail@gmail.com',
        to: user.email,
        subject: 'Account Verification - FurryHope',
        html: emailTemplate(code)
    }

    emailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email was sent to: ${info.response}`)
        }
    })
})

const reVerifyUser = asyncHandler(async (req, res) => {
    const { email, verificationCode } = req.body
    const user = await User.findOne({ email: email })

    const token = await VerificationToken.findOne({ owner: user._id })

    if(!token) {
        res.status(404)
        throw new Error('You code has expired')
    }

    const tokensMatch = await token.compareToken(verificationCode)
    if (!tokensMatch) {
        throw new Error('Invalid Verification code, Please enter a valid verification code.')
    }

    user.verified = true
    await VerificationToken.findByIdAndDelete(token._id)
    await user.save()

    res.json({
        message: 'Account has been validated, you can now login and use the app.',
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            verified: user.verified,
        }
    })
})

const verifyUser = asyncHandler(async (req, res) => {
    const { verificationCode } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
        throw new Error('Cannot Find User.')
    }

    if (user.verified) {
        throw new Error('User has already been verified.')
    }

    // Get a verification token based on the user's id
    const token = await VerificationToken.findOne({ owner: user._id })
    if (!token) {
        throw new Error('Cannot Find User / Code has expired.')
    }

    // Comparing the code that the user inputted to the one that is in the database.
    const tokensMatch = await token.compareToken(verificationCode)
    if (!tokensMatch) {
        throw new Error('Invalid Verification code, Please enter a valid verification code.')
    }

    // If the verification codes match, validate the user
    user.verified = true
    await VerificationToken.findByIdAndDelete(token._id)
    await user.save()

    res.json({
        message: 'Account has been validated, you can now login and use the app.',
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            verified: user.verified,
        }
    })
});

const sendResetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) {
        throw new Error('Please provide your email')
    }

    const user = await User.findOne({ email }) 
    if (!user) {
        throw new Error('User not found')
    }

    // To check whether a token is still in the database.
    const token = await ResetPasswordToken.findOne({ owner: user._id })
    if (token) {
        throw new Error('Your reset link is still valid, please wait for an hour upon requesting the link to get another one.')
    }

    // Generating the token for reseting the password
    const generatedToken = await generateResetPasswordToken()
    const resetToken = new ResetPasswordToken({ owner: user._id, token: generatedToken })
    await resetToken.save()

    let mailOptions = {
        from: 'furryhope.mail@gmail.com',
        to: user.email,
        subject: 'Reset Password Link - FurryHope',
        html: generateResetPasswordTemplate(`https://chimerical-mermaid-2fbf3d.netlify.app/reset-password?token=${generatedToken}&id=${user._id}`)
    }

    emailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email was sent to: ${info.response}`)
        }
    })

    res.json({
        success: true,
        message: 'Reset password link has been sent to your email.'
    })

})

const resetPassword = asyncHandler(async (req, res) => {
    // This 'user' and 'password' comes from the userAuth middleware where we check if the reset token is valid.
    const { password } = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
        throw new Error('User not found')
    }

    const isPasswordSame = await user.matchPassword(password)
    if (isPasswordSame) {
        throw new Error('Please use a different password than your old one.')
    }

    if (password.trim().length < 8) {
        throw new Error('Password must be at least 8 characters.')
    }

    // Saving the new password in the database
    user.password = password.trim()
    await user.save()

    // Removing the token from the database.
    await ResetPasswordToken.findOneAndDelete({ owner: user._id })

    let mailOptions = {
        from: 'furryhope.mail@gmail.com',
        to: user.email,
        subject: 'Password Reset Successful - FurryHope',
        html: plainEmailTemplate(
            'Password has been changed',
            'Login in with your new password.'
        )
    }

    emailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email was sent to: ${info.response}`)
        }
    })

    res.json({ 
        success: true,
        message: 'Password has been changed' 
    })
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, contactNo, address } = req.body
    const user = await User.findById(req.params.id)

    if(user) {
        // Changes the values to the updated one, if the user didn't update one, then it retains the value
        // user.fullName = req.body.fullName || user.fullName
        // user.email = req.body.email || user.email
        // user.contactNo = req.body.contactNo || user.contactNo

        user.fullName = fullName || user.fullName
        user.email = email || user.email
        user.contactNo = contactNo || user.contactNo
        user.address = address || user.address

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            contactNo: updatedUser.contactNo,
            address: updatedUser.address,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User was not found.')
    }
})

const updateProfilePicture = asyncHandler(async (req, res) => {
    const { profilePicture } = req.body
    const user = await User.findById(req.params.id)

    if(user) {
        user.profilePicture = profilePicture
        
        const updatedUser = await user.save()
        res.json(updatedUser)
    } else {
        res.status(404)
        throw new Error(`An error has occured, couldn't find the user.`)
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    const { password } = req.body
    const user = await User.findById(req.params.id)
    // const isPasswordSame = await user.matchPassword(password)

    // if(isPasswordSame) {
    //     throw new Error('Please use a different password than your old one.')
    // }
    
    if(user) {
        user.password = password
        const updatedUser = await user.save()
    } else {
        res.status(404)
        throw new Error('Could not find the user')
    }
})

// Baguhin nalang kung may dapat na baguhin like
// kung maassociate yung feedback mismo sa user.
const submitFeedback = asyncHandler(async (req, res) => {
    const { fullName, email, message, profilePicture, date, rating } = req.body;

    const createFeedback = await UserFeedback.create({
        fullName,
        email,
        message,
        profilePicture,
        date,
        rating,
    })

    if(createFeedback) {
        res.status(201).json({
            fullName: createFeedback.fullName,
            email: createFeedback.email,
            message: createFeedback.message,
            profilePicture: createFeedback.profilePicture,
            date: createFeedback.date, 
            rating: createFeedback.rating,
        });
    } else {
        res.status(400);
        throw new Error('An Error has occured');
    }

    res.json({
        fullName,
        email,
        message,
        profilePicture,
        date,
        rating,
    });
});

const submitReport = asyncHandler(async (req, res) => {
    const { date, location, description, image } = req.body
    /*
    if(!description || !image) {
        res.status(400)
        throw new Error('Please fill out the necessary information')
    } else {
        const report = new StrayAnimalReport({ date, location, description, image })
        const createdReport = await report.save()

        res.status(201).json(createdReport)
    }
    */

    const report = await StrayAnimalReport.create({
        date,
        location,
        description, 
        image,
    })

    if(report) {
        res.status(201).json({
            id: report.id,
            date: report.date,
            location: report.location,
            description: report.description,
            image: report.image,
        })
    } else {
        res.status(400)
        throw new Error('AN ERROR HAS OCCURRED')
    }

    res.json({
        description,
        image,
    })
})

const getSpecificRegistrations = asyncHandler(async (req, res) => {
    const specificRegistrations = await RegisterAnimal.find({ user: req.user._id})
    // The 'user: req.user._id' comes from the validated token of the user in authMiddleware.js
    
    res.json(specificRegistrations)
})

const submitAnimalRegistration = asyncHandler(async (req, res) => {
    const { 
        animalType, registrationType, applicantImg, name, contactNo, lengthOfStay, address,
        animalName, animalBreed, animalAge, animalColor, animalGender, tagNo, date, registrationStatus, email, adoptionReference, isFromAdoption, regFeeComplete, certOfResidencyComplete, ownerPictureComplete, petPhotoComplete,
        proofOfAntiRabiesComplete, photocopyCertOfAntiRabiesComplete,
    } = req.body

    if(
        !animalType || !registrationType || !applicantImg || !name || !contactNo || !lengthOfStay || !address ||
        !animalName || !animalBreed || !animalAge || !animalColor || !animalGender || !tagNo || !date || !email || !adoptionReference
    ) {
        res.status(400)
        throw new Error('Please fill out all necessary fields')
    } else {
        const newRegistration = new RegisterAnimal({
            animalType, registrationType, applicantImg, name, contactNo, lengthOfStay, address,
            animalName, animalBreed, animalAge, animalColor, animalGender, tagNo, date, registrationStatus, email, adoptionReference, isFromAdoption, 
            regFeeComplete, certOfResidencyComplete, ownerPictureComplete, petPhotoComplete, proofOfAntiRabiesComplete, photocopyCertOfAntiRabiesComplete, user: req.user._id
        })
        // The 'user: req.user._id' comes from the validated token of the user in authMiddleware.js

        const createdRegistration = await newRegistration.save()
        res.status(201)
        res.json(createdRegistration)
    }
})

const getAnimalRegistrationById = asyncHandler(async (req, res) => {
    const registration = await RegisterAnimal.findById(req.params.id)

    if(registration) {
        res.json(registration)
    } else {
        res.status(404).json({ message: 'Could not find registration' })
    }
})

const deleteAnimalRegistration = asyncHandler(async (req, res) => {
    const registration = await RegisterAnimal.findById(req.params.id)

    if(registration) {
        await registration.remove()
        res.json({ message: 'Successfully removed'})
    }
})

const submitAdoption = asyncHandler(async (req, res) => {
    const { animalId, applicantName, email, contactNo, address, applicantImg, validId, animalName, animalBreed,
            animalType, animalGender, animalColor, animalImg, adoptionStatus, date, applicationStatus, hasBeenInterviewed, hasPaid, adoptionReference,
    } = req.body

    if(!applicantName || !email || !contactNo || !address || !validId || !animalName || !animalBreed ||
        !animalType || !animalGender || !animalColor || !animalImg || !date
    ) {
        res.status(400)
        throw new Error('Please fill out all necessary fields')
    } else {
        const adoptionSubmission = new Adoption({
            animalId, applicantName, email, contactNo, address, applicantImg, validId, animalName, animalBreed, animalType,
            animalGender, animalColor, animalImg, adoptionStatus, date, applicationStatus, hasBeenInterviewed, hasPaid, adoptionReference, user: req.user.id
        })

        const newSubmission = await adoptionSubmission.save()
        res.status(201)
        res.json(newSubmission)
    }
})

const getSpecificAdoptions = asyncHandler(async (req, res) => {
    const specificAdoptions = await Adoption.find({ user: req.user._id })
    res.json(specificAdoptions)
})

const updatePreference = asyncHandler(async (req, res) => {
    const { animalPreference, breedPreferences, colorPreferences, genderPreference, sizePreference } = req.body

    const user = await User.findById(req.params.id)
    
    if(user) {
        user.animalPreference = animalPreference
        user.breedPreferences = breedPreferences
        user.colorPreferences = colorPreferences
        user.genderPreference = genderPreference
        user.sizePreference = sizePreference
        const updatedUser = await user.save()
        res.json(updatedUser)
    } else {
        res.status(404)
        throw new Error('User was not found.')
    }
})

const submitDonation = asyncHandler(async (req, res) => {
    const { dateOfDonation, time, name, email, contactNo, items, profilePicture } = req.body

    if(!dateOfDonation || !time || !name || !email || !contactNo || !items || !profilePicture) {
        res.status(400)
        throw new Error('Please fill out all the necessary fields.')
    } else {
        const donation = new Donation({
            dateOfDonation, time, name, email, contactNo, items, profilePicture, user: req.user.id
        })

        const createdDonation = await donation.save()
        res.status(201)
        res.json(createdDonation)
    }
})

module.exports = { 
    registerUser, 
    verifyUser,
    sendResetPassword,
    resetPassword,
    loginUser,
    getUserById, 
    updateUserProfile,
    updateProfilePicture,
    updatePassword,
    submitFeedback, 
    submitReport, 
    getSpecificRegistrations, 
    submitAnimalRegistration, 
    getAnimalRegistrationById,
    deleteAnimalRegistration,
    submitAdoption,
    getSpecificAdoptions,
    updatePreference,
    submitDonation,
    reSendCode,
    reVerifyUser,
};