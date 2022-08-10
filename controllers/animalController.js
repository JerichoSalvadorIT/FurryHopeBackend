const asyncHandler = require('express-async-handler');
const Animal = require ('../models/animalModel') // The animal model
const TotalCount = require('../models/totalAnimalCount')

// Gets all the animals
const getAnimals = asyncHandler(async (req, res) => {
    const animals = await Animal.find();
    res.json(animals);
});

const getBoth = asyncHandler(async (req, res) => {
    const animals = await Animal.find({ adoptionStatus: 'Not Adopted' })
    res.json(animals)
})

const getDogs = asyncHandler(async (req, res) => {
    const dogs = await Animal.find({ type: 'Dog', adoptionStatus: 'Not Adopted' })
    res.json(dogs)
})

const getCats = asyncHandler(async (req, res) => {
    const cats = await Animal.find({ type: 'Cat', adoptionStatus: 'Not Adopted' })
    res.json(cats)
})

// Creates a new animal
const createAnimal = asyncHandler(async (req, res) => {
    const {name, color, breed, description, gender, type, size, animalImg, adoptionStatus, availUntil, availUntilYear} = req.body;

    if(!name || !color || !breed || !description || !gender || !type || !size || !animalImg || !adoptionStatus || !availUntil || !availUntilYear) {
        res.status(400);
        throw new Error('Please fill out the necessary information');
    }
    else {
        // Creates a new animal and store it inside the database
        const animal = new Animal({ name, color, breed, description, gender, type, size, animalImg, adoptionStatus, availUntil, availUntilYear });

        // saves the animal into the database
        const createdAnimal = await animal.save();

        res.status(201).json(createdAnimal);
    }
});

const getAnimalById = asyncHandler(async (req, res) => {
    const animal = await Animal.findById(req.params.id);

    if(animal) {
        res.json(animal);
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }

});

// Updating the animal's data
const updateAnimal = asyncHandler(async (req, res) => {
    const { name, color, breed, description, gender, type, size, animalImg, adoptionStatus, availUntil, availUntilYear } = req.body
    
    // Finds the id of the animal
    const animal = await Animal.findById(req.params.id);
    // Checks whether the animal data exists, if it does update the data
    if(animal) {
        animal.name = name;
        animal.color = color;
        animal.breed = breed;
        animal.description = description;
        animal.gender = gender;
        animal.type = type;
        animal.size = size
        animal.animalImg = animalImg;
        animal.adoptionStatus = adoptionStatus;
        animal.availUntil = availUntil
        animal.availUntilYear = availUntilYear

        // Saving the updated data into the database
        const updatedAnimal = await animal.save();
        res.json(updatedAnimal)
    } else {
        res.status(404);
        throw new Error('Animal data was not found')
    }
});


// To delete an animal's data
const deleteAnimal = asyncHandler(async (req, res) => {
    const animal = await Animal.findById(req.params.id);

    // If it finds the animal, then it deletes its data
    if(animal) {
        await animal.remove(); // Removes the data from the database
        res.json({ message: "Animal Removed"});
    }
})

const addTotalCount = asyncHandler(async (req, res) => {
    const { currentCount } = req.body

    const count = new TotalCount({ currentCount })
    const totalCount = await count.save()
    res.status(201).json(totalCount)
})

const getTotalCount = asyncHandler(async (req, res) => {
    const totalCount = await TotalCount.findById('61cef5e41a1a1c19b8b57d43')
    res.json(totalCount)
})

const updateTotalCount = asyncHandler(async (req, res) => {
    const { currentCount } = req.body

    const totalCount = await TotalCount.findById('61cef5e41a1a1c19b8b57d43')
    if(totalCount) {
        totalCount.currentCount = currentCount

        const updatedCount = await totalCount.save()
        res.json(updatedCount)
    } else {
        res.status(404)
    }
})

module.exports = { 
    getAnimals,
    getBoth, 
    getDogs,
    getCats,
    createAnimal, 
    getAnimalById, 
    updateAnimal, 
    deleteAnimal, 
    addTotalCount, 
    getTotalCount, 
    updateTotalCount 
}
