const {getDogs, getDogsbyId, postDog, updateDog}=require('../controllers/dog.controller');
const express=require('express')
const router=express.Router();

router.get('/all', getDogs)
router.get('/:id', getDogsbyId)
router.post('/new', postDog)
router.put('/update/:id', updateDog)

module.exports=router