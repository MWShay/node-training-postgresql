const express = require('express')
const uploadController = require('../controllers/upload')
const isAuth = require('../middleware/isAuth')
const uploadImage = require('../middleware/uploadImage')
const handleErrorAsync = require('../utils/handleErrorAsync');

const router = express.Router()

router.post('/', isAuth, uploadImage, handleErrorAsync(uploadController.postUploadImage))

module.exports = router