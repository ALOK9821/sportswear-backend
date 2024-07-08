const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

// @route    POST api/products
// @desc     Create a product
// @access   Private
router.post(
    '/',
    [
        auth,
        upload.single('image'),
        [
            check('name', 'Name is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('price', 'Price is required').isFloat({ gt: 0 })
        ]
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        productController.createProduct(req, res);
    }
);

// @route    GET api/products
// @desc     Get all products
// @access   Public
router.get('/', productController.getProducts);

// @route    GET api/products/:id
// @desc     Get product by ID
// @access   Public
router.get('/:id', productController.getProductById);

// @route    PUT api/products/:id
// @desc     Update a product
// @access   Private
router.put(
    '/:id',
    [
        auth,
        upload.single('image'),
        [
            check('name', 'Name is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('price', 'Price is required').isFloat({ gt: 0 })
        ]
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        productController.updateProduct(req, res);
    }
);

// @route    DELETE api/products/:id
// @desc     Delete a product
// @access   Private
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
