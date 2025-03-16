const appError = require('../utils/appError');

const uploadController = {
    async postUploadImage(req, res, next) {
      if(!req.files) {
        return next(appError(400, "欄位未填寫正確"));
      }
      req.files
      // 取得上傳的檔案資訊列表裡面的第一個檔案
      const file = req.files[0]

    
    
      // 圖片上傳至 firebase

      res.status(200).json({
        status: 'success',
        data: {
          image_url: imageUrl
        }
      })
    }
}

module.exports = uploadController