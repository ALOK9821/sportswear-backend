const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    let imageUrl = '';

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    console.error('Error uploading image:', error);
                    return res.status(500).send('Server error');
                }
                imageUrl = result.secure_url;
                const newProduct = new Product({
                    name,
                    description,
                    price,
                    imageUrl
                });

                newProduct.save().then(product => res.json(product));
            });

            result.end(req.file.buffer);
        } else {
            const newProduct = new Product({
                name,
                description,
                price
            });

            newProduct.save().then(product => res.json(product));
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
