const express = require('express');
const { authMiddleware , isAdmin } = require('../middlewares/authMiddleware');
const { getSingleBrand,allBrand, createBrand, updateBrand, deleteBrand } = require('../controllers/brandController');
const routes = express.Router();


routes.post('/create',authMiddleware,isAdmin,createBrand);
routes.put('/:id',authMiddleware,isAdmin,updateBrand),
routes.get('/',allBrand);
routes.get('/:id',getSingleBrand)
routes.delete('/:id',authMiddleware,isAdmin,deleteBrand)

module.exports = routes