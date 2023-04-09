const express = require('express');
const router = express.Router();
const {authMiddleware,isAdmin} = require('./../middlewares/authMiddleware')
const {createUser , loginUserCtrl , handleRefreshToken, getAllUsers ,logout, getSingleUser, updateUser ,blockUser,unblockUser , deleteUserById,updatePassword,sendEmailForgotPassword} = require('../controllers/userController');

router.put('/password',authMiddleware,updatePassword)
router.post('/register',createUser)
router.post('/login',loginUserCtrl)
router.post('/forgot-password',sendEmailForgotPassword)
router.get('/refresh',handleRefreshToken);
router.get('/getAllUsers',getAllUsers)
router.get('/logout',logout)
router.get('/:id',authMiddleware,isAdmin,getSingleUser)
router.delete('/:id',deleteUserById)
router.put('/edit-user',authMiddleware,updateUser);
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin,unblockUser);

module.exports = router;