const express = require('express');
const router = express.Router();
const { getDogs, getDogsbyId, postDog, updateDog, matchDogQuiz, matchDogWithAI, getLatestQuizAttempt, seedDogs, requestAdoption } = require('../controllers/dog.controller');
const authenticate = require('../middleware/authenticate');
const setUser = require('../middleware/setUser');

router.get('/', getDogs);
router.get('/:id', getDogsbyId);
router.post('/', postDog);
router.post('/seed', seedDogs);
router.put('/:id', updateDog);
router.post('/quiz', matchDogQuiz);
router.post('/quiz/ai', setUser, matchDogWithAI);
router.get('/quiz/latest', authenticate, getLatestQuizAttempt);
router.post('/:id/adopt', authenticate, requestAdoption);

module.exports = router;
