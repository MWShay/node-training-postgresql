const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateJWT } = require('../utils/jwtUtils')

const router = express.Router()
const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('Users')
const appError = require('../utils/appError')
const { isValidString, isValidPassword } = require('../utils/validUtils')
const isAuth = require('../middleware/isAuth')
const handleErrorAsync = require('../utils/handleErrorAsync')
const userController = require('../controllers/user')

const saltRounds = 10

// 新增使用者
router.post('/signup', handleErrorAsync(userController.postSignup))

router.post('/login', handleErrorAsync(userController.postLogin)),
// router.post('/login', async (req, res, next) => {
//   try {
//     const { email, password } = req.body
//     if (!isValidString(email) ||! isValidString(password)) {
//       // res.status(400).json({
//       //   status: 'failed',
//       //   message: '欄位未填寫正確'
//       // })
//       next(appError(400, '欄位未填寫正確'))
//       return
//     }
//     if(!isValidPassword(password)) {
//       next(appError(400, '密碼不符合規則，需要包含英文數字大小寫，最短8個字，最長16個字'))
//       // res.status(400).json({
//       //   status: 'failed',
//       //   message: '密碼不符合規則，需要包含英文數字大小寫，最短8個字，最長16個字'
//       // })
//       return
//     }

    
//     const userRepo = await dataSource.getRepository('User')
//     // 使用者不存在或密碼輸入錯誤
//     const findUser = await userRepo.findOne({
//       select: ['id', 'name', 'password'],
//       where: { 
//         email 
//       }
//     })
//     if (!findUser) {
//       logger.warn('登入錯誤: 使用者不存在或密碼輸入錯誤')
//       next(appError(400, '使用者不存在或密碼輸入錯誤'))
//       return
//     }
  
//     const isMatch = await bcrypt.compare(password, findUser.password)
//     if (!isMatch) {
//       console.log(password, findUser.password)
//       logger.warn('登入錯誤: 使用者不存在或密碼輸入錯誤')
//       next(appError(400, '登入錯誤: 使用者不存在或密碼輸入錯誤'))
//       return
//     }
//     // JWT
//     const token = generateJWT({
//       id: findUser.id,
//       role: findUser.role
//       // name: findUser.name
//     })


//     res.status(201).json({
//       status: 'success',
//       data: {
//         token,
//         user: {
//           id: findUser.id,
//           name: findUser.name

//         }
//       }
//     })
//   } catch (error) {
//     logger.error('登入錯誤:', error)
//     next(error)
//   }
// })

router.get('/profile', isAuth, handleErrorAsync(userController.getProfile))
// router.get('/profile', isAuth, async (req, res, next) => {
//   try {
//     const { id } = req.user;
//     const findUser = await dataSource.getRepository('User').findOne({
//       where: { id }
//     })

//     if(!isValidString(id)) {
//       next(appError(400, '欄位未填寫正確'))
//       return
//     }

//     // if (!findUser) {
//     //   logger.warn('取得使用者資料錯誤: 欄位未填寫正確')
//     //   next(appError(400, '取得使用者資料錯誤: 欄位未填寫正確'))
    
//     res.status(200).json({
//       status: 'success',
//       data: {
//         email: findUser.email,
//         name: findUser.name
//       }
//     })
//   } catch (error) {
//     logger.error('取得使用者資料錯誤:', error)
//     next(error)
//   }
// })

router.put('/profile', isAuth, handleErrorAsync(userController.putProfile))

// router.put('/profile', isAuth, async (req, res, next) => {
//   try {
//     const { id } = req.user;
//     const { name } = req.body;
//     if (!isValidString(name)) {
//       next(appError('400', '欄位未填寫正確'))
//       return
//     }
//     const userRepo = dataSource.getRepository('User')
//     // 檢查使用者名稱未變更
//     const findUser = await userRepo.findOne({
//       where: { id }
//     })

//     const updateUser = await userRepo.update({
//       id
//     }, {
//       name
//     })

//     if (updateUser.affected === 0) {
//       logger.warn('更新使用者失敗')
//       next(appError(400, '更新使用者失敗'))
//       return
//     }

//     if(findUser.name === name) {
//       logger.warn('更新使用者失敗: 使用者名稱未變更')
//       next(appError(400, '更新使用者失敗: 使用者名稱未變更'))
//       return
//     }

    
//     res.status(200).json({
//       status: 'success',
//     })
    
//   } catch (error) {
//     logger.error('取得使用者資料錯誤:', error)
//     next(error)
//   }
// })

router.put('/password', isAuth, handleErrorAsync(userController.putPassword))
module.exports = router
