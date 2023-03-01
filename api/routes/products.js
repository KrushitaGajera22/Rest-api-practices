const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (mimetype === image / png || mimetype === image / jpeg) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

mongoose.set('strictQuery', false);

const productController = require('../controllers/products');

// for getting all products
router.get('/', productController.products_get_all);

//for creating new product
router.post('/', checkAuth, upload.single('productImage'), productController.products_create_product);

//for finding product by id
router.get('/:productId', productController.products_get_product);

//for updating the products
router.patch('/:productId', checkAuth, productController.products_update_product);

//for deleting the product
router.delete('/:productId', checkAuth, productController.products_delete_product);

module.exports = router;