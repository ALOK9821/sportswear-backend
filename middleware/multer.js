const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported file format' }, false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB
    fileFilter
});

module.exports = upload;
