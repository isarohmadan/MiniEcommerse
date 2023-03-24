const express = require('express');
const router = express.Router();
const {authMiddleware,isAdmin} = require('./../middlewares/authMiddleware')
const {createUser , loginUserCtrl , handleRefreshToken, getAllUsers ,logout, getSingleUser, updateUser ,blockUser,unblockUser , deleteUserById} = require('../controllers/userController');
router.post('/register',createUser)
router.post('/login',loginUserCtrl)
router.get('/refresh',handleRefreshToken);
router.get('/getAllUsers',getAllUsers)
router.get('/logout',logout)
router.get('/:id',authMiddleware,isAdmin,getSingleUser)
router.delete('/:id',deleteUserById)
router.put('/edit-user',authMiddleware,updateUser);
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin,unblockUser);

module.exports = router;