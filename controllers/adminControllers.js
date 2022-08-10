const Admin = require('../models/adminModel');
const Animal = require ('../models/animalModel') // The animal model
const UserFeedback = require('../models/userFeedbackModel')
const User = require('../models/userModel')
const Donation = require('../models/donationModel')
const DonationInventory = require('../models/donationInventoryModel.js')
const StrayAnimalReport = require('../models/strayAnimalReport')
const RegisterAnimal = require('../models/animalRegistrationModel')
const Adoption = require('../models/adoptionModel')
const InterviewSched = require('../models/interviewSchedModel')
const asyncHandler = require('express-async-handler');
const { generateToken, generateResetPasswordToken } = require('../utils/generateToken');
const { emailTransport } = require('../utils/verifyUserUtils')
const { sendInterviewSchedTemplate, pickupTemplate, rejectAdoptionTemplate, registerAnimalTemplate } = require('../utils/emailTemplates');
const ResetPasswordToken = require('../models/resetPasswordToken');
const { generateResetPasswordTemplate, plainEmailTemplate } = require('../utils/resetPasswordUtil')

const registerAdmin = asyncHandler(async (req, res) => {
    const { fullName, email, contactNo, address, password, jobPosition, role, profilePicture } = req.body;

    // To check if an admin account exists
    const adminExists = await Admin.findOne({ email });

    // If an admin account already exists, we throw in an error
    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists.');
    }
    // If there's no equal admin account then create a new admin account
    // to create a new admin account
    const admin = await Admin.create({
        fullName,
        email,
        contactNo,
        address,
        password,
        jobPosition,
        role,
        profilePicture
    });

    // If the admin account was successfully created
    if (admin) {
        res.status(201).json({
            id: admin.id,
            fullName: admin.fullName,
            email: admin.email,
            contactNo: admin.contactno,
            address: admin.address,
            jobPosition: admin.jobPosition,
            role: admin.role,
            profilePicture: admin.profilePicture,
            token: generateToken(admin.id),
        })
    // If not an error occurs
    } else {
        res.status(400)
        throw new Error('Error Occured')
    }

    res.json({
        fullName,
        email,
        contactNo,
        address,
        jobPosition,
        role,
        profilePicture,
    });
});

const getAdminInfo = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if(!admin) {
        res.status(404)
        throw new Error('Could not find admin account')
    } else {
        res.json(admin)
    }
})

// Authenticating the account (logging in)
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Finds the admin in the db
    const adminAcc = await Admin.findOne({ email });
    if (adminAcc && (await adminAcc.matchPassword(password))) {
        res.json({
            id: adminAcc.id,
            fullName: adminAcc.fullName,
            email: adminAcc.email,
            contactNo: adminAcc.contactNo,
            address: adminAcc.address,
            jobPosition: adminAcc.jobPosition,
            role: adminAcc.role,
            profilePicture: adminAcc.profilePicture,
            token: generateToken(adminAcc.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid Username or Password');
    }
});

const getFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks = await UserFeedback.find()
    res.json(feedbacks);
})

const getFeedback = asyncHandler(async (req, res) => {
    const feedback = await UserFeedback.findById(req.params.id)

    if(feedback) {
        res.json(feedback)
    } else {
        res.status(404)
        throw new Error(`Couldn't find feedback.`)
    }
})

const deleteFeedback = asyncHandler(async (req, res) => {
    const feedback = await UserFeedback.findById(req.params.id)

    if(feedback) {
        await feedback.remove()
        res.json({ message: 'Successfully removed'})
    }
})

const updateFeedbackRead = asyncHandler(async (req, res) => {
    const feedback = await UserFeedback.findById(req.params.id)
    const viewed = true
    
    if(feedback) {
        feedback.viewed = viewed
        const updated = feedback.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error('Could not find specific feedback (Invalid ID)')
    }
})

const getPendingReports = asyncHandler(async (req, res) => {
    const reports = await StrayAnimalReport.find({ status: 'Pending' })
    res.json(reports)
})

const getDismissedReports = asyncHandler(async (req, res) => {
    const reports = await StrayAnimalReport.find({ status: 'Dismissed' })
    res.json(reports)
})

const reportHasBeenRead = asyncHandler(async (req, res) => {
    const report = await StrayAnimalReport.findById(req.params.id)

    if(report) {
        report.viewed = true
        const updated = report.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error('Could not find report. (Possible Invalid ID)')
    }
})

const getSpecificReport = asyncHandler(async (req, res) => {
    const report = await StrayAnimalReport.findById(req.params.id)

    if(report) {
        res.json(report)
    } else {
        res.status(404).json({ message: 'Could not find specific report.' })
    }
})

const dismissReport = asyncHandler(async (req, res) => {
    const { status } = req.body

    const report = await StrayAnimalReport.findById(req.params.id)
    if(report) {
        report.status = status
        const dismissedReport = await report.save()
        res.json(dismissedReport) 
    } else {
        res.status(404)
        throw new Error('Stray animal report was not found')
    }
})

const deleteReport = asyncHandler(async (req, res) => {
    const report = await StrayAnimalReport.findById(req.params.id)

    if(report) {
        await report.remove()
        res.json({ message: 'Successfully removed'})
    }
})

const getAllRegistrations = asyncHandler(async (req, res) => {
    const registrations = await RegisterAnimal.find()
    res.json(registrations)
})

const getRegistration = asyncHandler(async (req, res) => {
    const registration = await RegisterAnimal.findById(req.params.id)

    if(registration) {
        res.json(registration)
    } else {
        res.status(404)
        throw new Error('Could not find registration (Invalid ID)')
    }
})

const getPendingRegistrations = asyncHandler(async (req, res) => {
    const registrations = await RegisterAnimal.find({ registrationStatus: 'Pending' })
    res.json(registrations)
})

const getRegisteredPets = asyncHandler(async (req, res) => {
    const registrations = await RegisterAnimal.find({ registrationStatus: 'Registered' })
    res.json(registrations)
})

const getNotRegisteredPets = asyncHandler(async (req, res) => {
    const registrations = await RegisterAnimal.find({ registrationStatus: 'Not Registered' })
    res.json(registrations)
})

// const updateRegRequirements = asyncHandler(async (req, res) => {
//     const { } = req.body
//     const registration = await RegisterAnimal.findById(req.params.id)
// })

const deleteRegistration = asyncHandler(async (req, res) => {
    const registration = await RegisterAnimal.findById(req.params.id)

    if(registration) {
        await registration.remove()
        res.json({ message: 'Successfully removed'})
    }
})

const registerAnimal = asyncHandler(async (req, res) => {
    const registration = await RegisterAnimal.findById(req.params.id)
    const registered = 'Registered'

    if(registration) {
        registration.registrationStatus = registered
        const updated = await registration.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error('Registration was not found.')
    }
})
// rejectRegistration

const sendRegisteredMessage = asyncHandler(async (req, res) => {
    const { email, name, animalName, } = req.body

    let mailOptions = {
        from: 'furryhope.mail@gmail.com',
        to: email,
        subject: 'Marikina Veterinary Office - Your pet has been registered to the vet office.',
        html: registerAnimalTemplate(name, animalName)
    }

    emailTransport.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log(`Email was sent to: ${info.response}`)
        }
    })
})

const getAdoptionSubmissions = asyncHandler(async (req, res) => {
    const submissions = await Adoption.find()
    res.json(submissions)
})

const getAdoptionSubmissionPerAnimal = asyncHandler(async (req, res) => {
    const submissions = await Adoption.find({ animalId: req.params.id })
    
    if(submissions) {
        res.json(submissions)
    } else {
        res.status(404).json({ message: 'Could not find adoption applications'})
    }
})

const getAdoptionById = asyncHandler(async (req, res) => {
    const adoption = await Adoption.findById(req.params.id)

    if (adoption) {
        res.json(adoption)
    } else {
        res.status(404).json({ message: 'Could not find adoption application' })
    }
})

const deleteAdoptionById = asyncHandler(async (req, res) => {
    const adoption = await Adoption.findById(req.params.id)

    if(adoption) {
        await adoption.remove()
        res.json({ message: 'Successfully removed'})
    }
})

const updateAdoptionStatus = asyncHandler(async (req, res) => {
    const { adoptionStatus } = req.body
    const animal = await Animal.findById(req.params.id)

    if (animal) {
        animal.adoptionStatus = adoptionStatus

        const updated = await animal.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error(`Animal's data was not found`)
    }
})

const updateAdmin = asyncHandler(async (req, res) => {
    const { fullName, email, contactNo, address, jobPosition, role, profilePicture } = req.body
    const admin = await Admin.findById(req.params.id)

    if(admin) {
        admin.fullName = fullName || admin.fullName
        admin.email = email || admin.email
        admin.contactNo = contactNo || admin.contactNo
        admin.address = address || admin.address
        admin.jobPosition = jobPosition || admin.jobPosition
        admin.role = role || admin.role
        admin.profilePicture = profilePicture || admin.profilePicture

        const updatedAdmin = await admin.save()

        res.json({
            _id: updatedAdmin._id,
            fullName: updatedAdmin.fullName,
            email: updatedAdmin.email,
            address: updatedAdmin.address,
            jobPosition: updatedAdmin.jobPosition,
            role: updatedAdmin.role,
            profilePicture: updatedAdmin.profilePicture
        })
    } else {
        res.status(404)
        throw new Error('Admin was not found')
    }
})

const updateRequirements = asyncHandler(async (req, res) => {
    const { regFeeComplete, certOfResidencyComplete, ownerPictureComplete, petPhotoComplete, proofOfAntiRabiesComplete, photocopyCertOfAntiRabiesComplete } = req.body
    const registration = await RegisterAnimal.findById(req.params.id)

    if(registration) {
        registration.regFeeComplete = regFeeComplete || registration.regFeeComplete
        registration.certOfResidencyComplete = certOfResidencyComplete || registration.certOfResidencyComplete
        registration.ownerPictureComplete = ownerPictureComplete || registration.ownerPictureComplete
        registration.petPhotoComplete = petPhotoComplete || registration.petPhotoComplete
        registration.proofOfAntiRabiesComplete = proofOfAntiRabiesComplete || registration.proofOfAntiRabiesComplete
        registration.photocopyCertOfAntiRabiesComplete = photocopyCertOfAntiRabiesComplete || registration.photocopyCertOfAntiRabiesComplete
    
        const updated = await registration.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error('Could not find registration. Invalid ID')
    }
})

const rejectRegistration = asyncHandler(async (req, res) => {
    const registration = await RegisterAnimal.findById(req.params.id)
    const registrationStatus = 'Not Registered'

    if(registration) {
        registration.registrationStatus = registrationStatus

        const updated = await registration.save()
        res.json(updated)
    }
})

const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { adoptionStatus, applicationStatus } = req.body

    const adoption = await Adoption.findById(req.params.id)

    if (adoption) {
        adoption.adoptionStatus = adoptionStatus
        adoption.applicationStatus = applicationStatus

        const updated = await adoption.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error(`Adoption application couldn't be found.`)
    }
})

const getUserAccounts = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.json(users)
})

const getAdminAccounts = asyncHandler(async (req, res) => {
    const admins = await Admin.find()
    res.json(admins)
})

const deleteUserAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User account has been removed'})
    }
})

const deleteAdminAccount = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if (admin) {
        await admin.remove()
        res.json({ message: 'Admin account has been removed'})
    }
})

const createInterviewSched = asyncHandler(async (req, res) => {
    const { recipientEmail, date, time } = req.body
    const applicant = req.params.id

    if(!recipientEmail || !date || !time) {
        res.status(400)
        throw new Error('Please fill out all the necessary fields.')
    } else if (!applicant) {
        res.status(400)
        throw new Error('There is no applicant ID')
    } else {
        const interviewSchedSubmission = await InterviewSched.create({
            recipientEmail, date, time, applicant
        })

        if(interviewSchedSubmission) {
            res.status(201).json({
                recipientEmail: interviewSchedSubmission.recipientEmail,
                date: interviewSchedSubmission.date,
                time: interviewSchedSubmission.time,
                applicant: interviewSchedSubmission.applicant
            })
        } else {
            res.status(400)
            throw new Error('An error has occured')
        }
    }

    let mailOptions = {
        from: 'furryhope.mail@gmail.com',
        to: recipientEmail,
        subject: 'Marikina Veterinary Office - Interview for Adopting one of our animals',
        html: sendInterviewSchedTemplate(date, time)
    }

    emailTransport.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log(`Email was sent to: ${info.response}`)
        }
    })
})

const updateHasBeenInterviewed = asyncHandler(async (req, res) => {
    const adoption = await Adoption.findById(req.params.id)
    const hasBeenInterviewed = true

    if(adoption) {
        adoption.hasBeenInterviewed = hasBeenInterviewed
        const updated = adoption.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error(`An error has occurred, couldn't find adoption.`)
    }
})

const getInterviewSched = asyncHandler(async (req, res) => {
    const interviewSched = await InterviewSched.find({ applicant: req.params.id })

    if(!interviewSched) {
        res.status(404)
        throw new Error('Interview Schedule not found')
    } else {
        res.json(interviewSched)
    }
})

const submitPickupMessage = asyncHandler(async (req, res) => {
    const { email, pickupDate, pickupTime, animalName, adopterName } = req.body

    if(!email || !pickupDate || !pickupTime || !animalName || !adopterName) {
        res.status(400)
        throw new Error('Please fill out all the fields')
    } else {
        let mailOptions = {
            from: 'furryhope.mail@gmail.com',
            to: email,
            subject: 'Your adoption has been accepted - FurryHope',
            html: pickupTemplate(pickupDate, pickupTime, animalName, adopterName)
        }

        emailTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`Email was sent to: ${info.response}`)
            }
        })
    }
})

const sendRejectMessage = asyncHandler(async (req, res) => {
    const { email, adopterName, animalName } = req.body

    if(!adopterName || !animalName) {
        res.status(400)
        throw new Error('An error has occurred')
    } else {
        let mailOptions = {
            from: 'furryhope.mail@gmail.com',
            to: email,
            subject: 'Your adoption has been rejected - FurryHope',
            html: rejectAdoptionTemplate(adopterName, animalName)
        }

        emailTransport.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error)
            } else {
                console.log(`Email was sent to: ${info.response}`)
            }
        })
    }
})

const getDonations = asyncHandler(async (req, res) => {
    const donations = await Donation.find()
    res.json(donations)
})

const getDonationById = asyncHandler(async (req, res) => {
    const donation = await Donation.findById(req.params.id)
    if(donation) {
        res.json(donation)
    } else {
        res.status(404)
        throw new Error('Could not find specific adoption')
    }
})

const deleteDonation = asyncHandler(async (req, res) => {
    const donation = await Donation.findById(req.params.id)

    if(donation) {
        await donation.remove()
        res.json({ message: 'Removed donation.' })
    }
})

const receivedDonation = asyncHandler(async (req, res) => {
    const donation = await Donation.findById(req.params.id)
    const received = 'Received'

    if(donation) {
        donation.received = received
        const updated = await donation.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error('Could not find donation')
    }
})

const addToInventory = asyncHandler(async (req, res) => {
    const { dataItems, donatedBy, donatedByPicture, dateOfDonation } = req.body

    if(!dataItems || !donatedBy || !dateOfDonation)  {
        res.status(400)
        throw new Error('')
    } else {
        const addToInventorySubmission = await DonationInventory.create({
            dataItems, donatedBy, donatedByPicture, dateOfDonation
        })

        if(addToInventorySubmission) {
            res.status(201).json({
                dataItems: addToInventorySubmission.dataItems,
                donatedBy: addToInventorySubmission.donatedBy,
                donatedByPicture: addToInventorySubmission.donatedByPicture,
                dateOfDonation: addToInventorySubmission.dateOfDonation
            })
        } else {
            res.status(400)
            throw new Error('An error occurred, could not add to the inventory.')
        }
    }
})

const getDonationInventory = asyncHandler(async (req, res) => {
    const inventoryList = await DonationInventory.find()
    res.json(inventoryList)
})

const deleteFromInventory = asyncHandler(async (req, res) => {
    const inventory = await DonationInventory.findById(req.params.id)

    if(inventory) {
        await inventory.remove()
        res.json({ message: 'removed from donation inventory '})
    }
})

const sendResetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new Error('Please provide your email')
    }

    const admin = await Admin.findOne({ email })

    if(!admin) {
        throw new Error('Admin not found')
    }    

    // To check whether a token is still in the database.
    const token = await ResetPasswordToken.findOne({ owner: admin._id })
    if (token) {
        throw new Error('Your reset link is still valid, please wait for an hour upon requesting the link to get another one.')
    }

    // Generating the token for reseting the password
    const generatedToken = await generateResetPasswordToken()
    const resetToken = new ResetPasswordToken({ owner: admin._id, token: generatedToken })
    await resetToken.save()

    let mailOptions = {
        from: 'furryhope.mail@gmail.com',
        to: admin.email,
        subject: 'Reset Password Link - FurryHope',
        html: generateResetPasswordTemplate(`http://localhost:3001/reset-password?token=${generatedToken}&id=${admin._id}`)
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

    const admin = await Admin.findById(req.admin._id)
    if (!admin) {
        throw new Error('User not found')
    }

    const isPasswordSame = await admin.matchPassword(password)
    if (isPasswordSame) {
        throw new Error('Please use a different password than your old one.')
    }

    if (password.trim().length < 8) {
        throw new Error('Password must be at least 8 characters.')
    }

    // Saving the new password in the database
    admin.password = password.trim()
    await admin.save()

    // Removing the token from the database.
    await ResetPasswordToken.findOneAndDelete({ owner: admin._id })

    let mailOptions = {
        from: 'furryhope.mail@gmail.com',
        to: admin.email,
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

module.exports = {
    sendResetPassword,
    resetPassword,
    registerAdmin,
    authAdmin,
    getAdminInfo,
    getFeedbacks,
    getFeedback,
    deleteFeedback,
    updateFeedbackRead,
    updateRequirements,
    getPendingReports,
    getRegistration,
    getDismissedReports,
    getSpecificReport,
    reportHasBeenRead,
    dismissReport,
    deleteReport,
    getAllRegistrations,
    registerAnimal,
    sendRegisteredMessage,
    getAdoptionSubmissions,
    getAdoptionSubmissionPerAnimal,
    getAdoptionById,
    deleteAdoptionById,
    updateAdoptionStatus,
    updateApplicationStatus,
    getUserAccounts,
    getAdminAccounts,
    deleteUserAccount,
    deleteAdminAccount,
    createInterviewSched,
    getInterviewSched,
    submitPickupMessage,
    sendRejectMessage,
    getDonations,
    getDonationById,
    deleteDonation,
    receivedDonation,
    addToInventory,
    getDonationInventory,
    updateHasBeenInterviewed,
    updateAdmin,
    deleteFromInventory,
    getPendingRegistrations,
    getRegisteredPets,
    getNotRegisteredPets,
    deleteRegistration,
    rejectRegistration,
};