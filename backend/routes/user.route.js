const {getUser, getUserById, postUser, putUser}=require('../controllers/user.controller')
const express=require('express')
const router=express.Router()

router.get('/all', getUser)
router.get('/:id', getUserById)
router.post('/new', postUser)
router.put('/update/:id', putUser)

module.exports=router