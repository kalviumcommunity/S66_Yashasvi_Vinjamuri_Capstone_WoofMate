const {getDogs, getDogsbyId}=require('../controllers/dog.controller');
const express=require('express')
const router=express.Router();


router.get('/all', getDogs)
router.get('/:id', getDogsbyId)

module.exports=router