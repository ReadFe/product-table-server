const router = require('express').Router();
const multer = require('multer');
const productController = require('./controller');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.delete('/product/:id', upload.single('image'), productController.destroy);
router.put('/product/:id', upload.single('image'), productController.update);
router.post('/product', upload.single('image') , productController.store);

module.exports = router;