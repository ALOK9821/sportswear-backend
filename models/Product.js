const { check, validationResult } = require('express-validator');

// Add validation checks to the create and update product routes
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