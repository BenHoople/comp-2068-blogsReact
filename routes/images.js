const {index, new: _new, create} = require('../controllers/ImagesController');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
});

module.exports = router => {
    router.get('/images/', index);
    router.get('/images/new', _new);
    router.post('/images', upload.single('image'), create);
};

