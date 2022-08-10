const mongoose = require('mongoose')

registerAnimalSchema = mongoose.Schema(
    {
        animalType: {
            type: String,
            required: true,
        },

        registrationType: {
            type: String,
            required: true,
        },

        applicantImg: {
            type: String,
        },

        name: {
            type: String,
            required: true,
        },
        
        contactNo: {
            type: String,
            required: true,
        },

        lengthOfStay: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        animalName:{
            type: String,
            required: true,
        },

        animalBreed: {
            type: String,
            required: true,
        },

        animalAge: {
            type: String,
            required: true,
        },
        
        animalColor: {
            type: String,
            required: true,
        },

        animalGender: {
            type: String,
            required: true,
        },

        tagNo: {
            type: String,
        },

        date: {
            type: String,
            required: true,
        },

        registrationStatus: {
            type: String,
        },

        email: {
            type: String,
            required: true,
        },

        adoptionReference: {
            type: String,
            required: true
        },

        isFromAdoption: {
            type: Boolean,
            required: true
        },

        regFeeComplete: {
            type: Boolean,
            default: false,
        },

        certOfResidencyComplete: {
            type: Boolean,
            default: false,
        },

        ownerPictureComplete: {
            type: Boolean,
            default: false,
        },

        petPhotoComplete: {
            type: Boolean,
            default: false,
        },

        proofOfAntiRabiesComplete: {
            type: Boolean,
            default: false,
        },

        photocopyCertOfAntiRabiesComplete: {
            type: Boolean,
            default: false,
        },
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

    },
    {
        timestamps: true,
    }
)

const RegisterAnimal = mongoose.model('RegisterAnimal', registerAnimalSchema)
module.exports = RegisterAnimal