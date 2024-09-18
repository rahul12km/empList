const express=require('express');
const router = express.Router();
const {loginController,registerController}=require('../controller/user')

router.get('/login',loginController)
router.post('/register',registerController)

module.exports = router