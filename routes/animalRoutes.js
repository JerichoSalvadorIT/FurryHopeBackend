const express = require('express');
const { 
    getAnimals, 
    getDogs,
    getCats,
    createAnimal, 
    getAnimalById, 
    updateAnimal, 
    deleteAnimal,
    getTotalCount,
    addTotalCount,
    updateTotalCount, 
    getBoth
} = require('../controllers/animalController');
const router = express.Router();

// Route to get all the animals - /api/animals
router.route('/').get(getAnimals);

router.route('/getBoth').get(getBoth)
router.route('/getDogs').get(getDogs)
router.route('/getCats').get(getCats)

// Route for creating the animal's data - /api/animals/create
router.route('/create').post(createAnimal);

// Total route count - push notif
router.route('/totalCount').get(getTotalCount)
router.route('/addCount').post(addTotalCount)
router.route('/updateCount').put(updateTotalCount) 

// Route for getting a single animal data,
// Also to update, delete an animal's data
router
    .route('/:id')
    .get(getAnimalById)
    .put(updateAnimal)
    .delete(deleteAnimal); 
    // /api/animals/id 

module.exports = router;