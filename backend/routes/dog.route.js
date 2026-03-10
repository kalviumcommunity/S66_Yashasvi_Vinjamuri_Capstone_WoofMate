const express = require('express');
const router = express.Router();
const { getDogs, getDogsbyId, postDog, updateDog, matchDogQuiz, matchDogWithAI, seedDogs } = require('../controllers/dog.controller');

router.get('/', getDogs);
router.get('/:id', getDogsbyId);
router.post('/', postDog);
router.post('/seed', seedDogs);
router.put('/:id', updateDog);
router.post('/quiz', matchDogQuiz);
router.post('/quiz/ai', matchDogWithAI);

module.exports = router;
