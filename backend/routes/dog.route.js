const {getDogs, getDogsbyId, postDog}=require('../controllers/dog.controller');
const express=require('express')
const router=express.Router();

router.get('/all', getDogs)
router.get('/:id', getDogsbyId)
router.post('/new', postDog)

module.exports=router